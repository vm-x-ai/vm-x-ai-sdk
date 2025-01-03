import fs from 'fs';
import fsPromises from 'fs/promises';
import os from 'os';
import path from 'path';
import { input } from '@inquirer/prompts';
import archiver from 'archiver';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import esbuild, { type BuildOptions } from 'esbuild';
import mime from 'mime-types';
import type { Logger } from 'pino';
import { v4 as uuid } from 'uuid';
import { readManifest } from '../../utils/manifest';
import { DEFAULT_EXTERNALS } from '../consts';
import type { Manifest } from '../manifest';
import { manifestSchema } from '../manifest';
import { BaseCommand } from '../types';

export type PublishCommandArgs = {
  manifest: string;
  pat?: string;
  apiBaseUrl?: string;
  dryRun: boolean;
  watch: boolean;
  workspaceId?: string;
  environmentId?: string;
};

const DEFAULT_API_BASE_URL = 'https://api.vm-x.ai';

export class PublishCommand extends BaseCommand<PublishCommandArgs> {
  private manifest: Manifest;

  constructor(logger: Logger) {
    super(logger);
  }

  async run(argv: PublishCommandArgs) {
    this.logger.debug(`Command arguments: ${JSON.stringify(argv, null, 2)}`);
    if (!argv.dryRun && !argv.pat) {
      this.logger.error(chalk.red`Personal Access Token is required to publish the completion provider`);
      process.exit(1);
    }

    this.logger.info(chalk.bold`Publishing the completion provider`);
    this.manifest = this.loadManifest(argv);

    this.logger.debug(`Manifest: ${JSON.stringify(this.manifest, null, 2)}`);

    const publisher = new Publisher(this.logger, argv.apiBaseUrl ?? DEFAULT_API_BASE_URL, argv.pat as string);

    const distPath = await this.buildHandler(publisher, argv);

    if (!argv.dryRun && !argv.watch) {
      await publisher.publish(this.manifest, distPath, false);
    }

    this.logger.info(chalk.bold`Completion provider published successfully`);
  }

  private loadManifest(argv: PublishCommandArgs, reload = false) {
    !reload && this.logger.info(`Using manifest file ${chalk.bold(argv.manifest)}`);
    this.logger.debug(`Loading manifest file ${argv.manifest}`);
    const manifest = readManifest(argv.manifest);

    return this.validateManifest(manifest, reload);
  }

  private validateManifest(rawManifest: unknown, reload = false): Manifest {
    let manifest: Manifest;
    try {
      manifest = manifestSchema.parse(rawManifest);
    } catch (error) {
      this.logger.error(chalk.red`Error parsing manifest file: ${(error as Error).message}`);
      this.logger.debug(`Error details: ${JSON.stringify(error, null, 2)}`);
      process.exit(1);
    }

    !reload && this.logger.info(`Manifest file parsed successfully`);

    if (!fs.existsSync(manifest.config.logo.src)) {
      this.logger.error(chalk.red`Logo file ${chalk.bold(manifest.config.logo.src)} does not exist`);
      process.exit(1);
    }

    if (!fs.existsSync(manifest.config.handler.src)) {
      this.logger.error(chalk.red`Handler file ${chalk.bold(manifest.config.handler.src)} does not exist`);
      process.exit(1);
    }

    if (!fs.existsSync(manifest.config.handler.tsConfigPath)) {
      this.logger.error(
        chalk.red`Handler tsconfig file ${chalk.bold(manifest.config.handler.tsConfigPath)} does not exist`,
      );
      process.exit(1);
    }

    for (const model of manifest.config.models) {
      if (model.logo && !fs.existsSync(model.logo.src)) {
        this.logger.error(chalk.red`Model logo file ${chalk.bold(model.logo.src)} does not exist`);
        process.exit(1);
      }
    }
    return manifest;
  }

  private async watchLogs(argv: PublishCommandArgs): Promise<void> {
    const workspaceId =
      argv.workspaceId ??
      (await input({
        message: 'Workspace ID: ',
      }));
    const environmentId =
      argv.environmentId ??
      (await input({
        message: 'Environment ID: ',
      }));

    let startTime = Date.now();
    while (true) {
      try {
        const response = await axios.get(
          `${argv.apiBaseUrl ?? DEFAULT_API_BASE_URL}/workspace/ai-provider/${this.manifest.id}/${this.manifest.version}/logs/${workspaceId}/${environmentId}`,
          {
            params: {
              startTime,
            },
            headers: {
              Authorization: `Bearer ${argv.pat}`,
            },
          },
        );

        for (const log of response.data.logs) {
          this.logger.info(chalk.yellow.bold`[${new Date(log.timestamp).toISOString()}] ${log.message}`);
        }
        startTime =
          response.data.logs.length > 0 ? response.data.logs[response.data.logs.length - 1].timestamp + 100 : startTime;
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          this.logger.error(chalk.red`Error fetching logs: ${error.response?.data.message}`);
        } else {
          this.logger.error(chalk.red`Error fetching logs: ${(error as Error).message}`);
        }
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 seconds
      }
    }
  }

  private async buildHandler(publisher: Publisher, argv: PublishCommandArgs): Promise<string> {
    this.logger.info(`Bulding with ${chalk.bold('esbuild')}...`);

    const esbuildConfigPath = path.join(process.cwd(), './esbuild.config.js');

    if (!fs.existsSync(esbuildConfigPath)) {
      this.logger.error(chalk.red`esbuild config file ${chalk.bold(esbuildConfigPath)} does not exist`);
      process.exit(1);
    }

    this.logger.debug(`Loading esbuild config file ${esbuildConfigPath}`);
    const userDefinedEsbuildConfig = (await import(esbuildConfigPath)).default as BuildOptions;

    this.logger.debug(`User-defined esbuild config: ${JSON.stringify(userDefinedEsbuildConfig, null, 2)}`);

    const distPath = path.join(process.cwd(), 'dist', 'index.js');

    let watchLogsPromise: Promise<void> | undefined = undefined;

    const esbuildConfig = {
      ...userDefinedEsbuildConfig,
      external: [...new Set([...(userDefinedEsbuildConfig.external ?? []), ...DEFAULT_EXTERNALS])],
      sourcemap: userDefinedEsbuildConfig?.sourcemap ?? false,
      metafile: userDefinedEsbuildConfig?.metafile ?? false,
      bundle: true,
      entryNames: '[dir]/[name]',
      tsconfig: path.join(process.cwd(), this.manifest.config.handler.tsConfigPath),
      outExtension: {
        '.js': '.js',
      },
      entryPoints: [path.join(process.cwd(), this.manifest.config.handler.src)],
      outfile: distPath,
      plugins: [
        ...(argv.watch
          ? [
              {
                name: 'watch-plugin',
                setup: (build: esbuild.PluginBuild) => {
                  build.onEnd(async () => {
                    this.logger.info(`Republishing completion provider...`);
                    await publisher.publish(this.manifest, distPath, true);
                    this.logger.info(`Completion provider republished successfully`);

                    if (!watchLogsPromise) {
                      watchLogsPromise = this.watchLogs(argv);
                    }
                  });
                },
              },
            ]
          : []),
        ...(userDefinedEsbuildConfig.plugins ?? []),
      ],
    };

    if (argv.watch) {
      fs.watchFile(argv.manifest, async () => {
        this.logger.info(`Manifest file ${chalk.bold(argv.manifest)} has been changed`);
        this.manifest = this.loadManifest(argv, true);
        this.logger.info(`Republishing completion provider...`);
        await publisher.publish(this.manifest, distPath, true);
        this.logger.info(`Completion provider republished successfully`);
      });
    }

    this.logger.debug(`Final esbuild config: ${JSON.stringify(esbuildConfig, null, 2)}`);

    if (argv.watch) {
      this.logger.info(`Watching changes with ${chalk.bold('esbuild')}...`);
      const context = await esbuild.context(esbuildConfig);
      process.on('SIGINT', () => {
        this.logger.debug(`Stopping esbuild watch`);
        context.dispose();
        process.exit(0);
      });

      await context.watch({});
      return distPath;
    }

    try {
      const startBuild = Date.now();
      await esbuild.build(esbuildConfig);
      this.logger.info(`Build completed in ${chalk.bold(`${Date.now() - startBuild}ms`)}`);
    } catch (error) {
      this.logger.error(chalk.red`Error building with esbuild: ${(error as Error).message}`);
      process.exit(1);
    }

    return distPath;
  }
}

export class Publisher {
  private axiosInstance: AxiosInstance;

  constructor(
    private logger: Logger,
    apiBaseUrl: string,
    pat: string,
  ) {
    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        Authorization: `Bearer ${pat}`,
      },
    });
  }

  public async publish(manifest: Manifest, handlerJsPath: string, debug: boolean) {
    await this.checkManifestVersion(manifest);

    const presignedManifest = await this.getPresignedManifest(manifest);

    await this.uploadAssets(manifest, presignedManifest, handlerJsPath, debug);

    if (!debug) {
      const distSource = await this.archiveSourceCode();
      await this.uploadSourceCode(distSource, presignedManifest);
    }

    await this.completePublishing(presignedManifest, debug);
  }

  private async uploadSourceCode(
    distSource: string,
    presignedManifest: Manifest & {
      config: Manifest['config'] & {
        source: {
          url: string;
        };
      };
    },
  ) {
    this.logger.debug(`Uploading source code archive from ${chalk.bold(distSource)}`);
    await axios.put(presignedManifest.config.source.url, await fsPromises.readFile(distSource), {
      headers: {
        'Content-Type': mime.lookup(distSource) || 'application/octet-stream',
      },
    });
    this.logger.debug(`Source code archive uploaded successfully`);
  }

  private async archiveSourceCode() {
    const archive = archiver('zip');
    const distSource = path.join(os.tmpdir(), `${uuid()}.zip`);
    const output = fs.createWriteStream(distSource);

    archive.pipe(output);

    archive.glob('*/**', {
      cwd: process.cwd(),
      ignore: ['node_modules', 'dist', 'coverage', '.git', '.env*'],
    });

    await archive.finalize();
    return distSource;
  }

  private async uploadAssets(
    manifest: Manifest,
    presignedManifest: Manifest & {
      config: Manifest['config'] & {
        source: {
          url: string;
        };
      };
    },
    distPath: string,
    debug: boolean,
  ) {
    const uploads = [
      {
        label: 'Logo',
        localPath: manifest.config.logo.src,
        url: presignedManifest.config.logo.url,
      },
      {
        label: 'Handler',
        localPath: path.relative(process.cwd(), distPath),
        url: presignedManifest.config.handler.url,
      },
      ...manifest.config.models
        .filter((model) => model.logo)
        .map((model, idx) => ({
          label: `Model logo ${model.label}`,
          localPath: model.logo?.src as string,
          url: presignedManifest.config.models[idx].logo?.url,
        })),
    ];

    const uploadedMap: Record<string, boolean> = {};

    for (const upload of uploads) {
      if (uploadedMap[upload.localPath]) {
        continue;
      }

      let bar: cliProgress.SingleBar | undefined = undefined;
      if (!debug) {
        bar = new cliProgress.SingleBar(
          {
            format: `Uploading ${chalk.bold(upload.label)} file ${chalk.bold(upload.localPath)} [{bar}] {percentage}%`,
          },
          cliProgress.Presets.shades_classic,
        );
        bar.start(1, 0);
      }
      await axios.put(upload.url as string, await fsPromises.readFile(upload.localPath), {
        headers: {
          'Content-Type': mime.lookup(upload.localPath) || 'application/octet-stream',
        },
        onUploadProgress(progressEvent) {
          if (!progressEvent.total) return;
          bar?.update(progressEvent.loaded / progressEvent.total);
        },
      });

      uploadedMap[upload.localPath] = true;

      bar?.stop();
    }
  }

  private async checkManifestVersion(manifest: Manifest): Promise<void> {
    try {
      const response = await this.axiosInstance.get<Manifest & { status: string }>(
        `/workspace/ai-provider/${manifest.id}`,
      );
      if (
        response.data.version === manifest.version &&
        !['pending-publish', 'debugging'].includes(response.data.status)
      ) {
        this.logger.warn(
          chalk.yellow`The version ${chalk.bold(
            manifest.version,
          )} is already published, please update the version in the${chalk.bold('package.json')} file and try again`,
        );
        process.exit(0);
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        if (error.response?.status === 404) {
          this.logger.debug(`Version ${chalk.bold(manifest.version)} is not published yet`);
        } else {
          this.logger.error(chalk.red`Error checking the completion provider version: ${error.response?.data.message}`);
          process.exit(1);
        }
      } else {
        this.logger.error(chalk.red`Error checking the completion provider version: ${(error as Error).message}`);
        process.exit(1);
      }
    }
  }

  private async completePublishing(presignedManifest: Manifest, debug: boolean) {
    try {
      this.logger.debug(`Calling VM-X API endpoint /workspace/ai-provider/publish/complete`);
      const response = await this.axiosInstance.post('/workspace/ai-provider/publish/complete', {
        id: presignedManifest.id,
        version: presignedManifest.version,
        debug,
      });
      this.logger.debug(`VM-X API response: ${response.status}`);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        this.logger.error(
          chalk.red`Error completing the completion provider publishing: ${error.response?.data.message}`,
        );
      } else {
        this.logger.error(chalk.red`Error completing the completion provider publishing: ${(error as Error).message}`);
      }

      process.exit(1);
    }
  }

  private async getPresignedManifest(manifest: Manifest): Promise<
    Manifest & {
      config: Manifest['config'] & {
        source: {
          url: string;
        };
      };
    }
  > {
    try {
      this.logger.debug(`Preparing the completion provider for publishing`);

      const { src: handlerSrc, ...handler } = manifest.config.handler;
      const { src: logoSrc, ...logo } = manifest.config.logo;

      const payload = {
        ...manifest,
        config: {
          ...manifest.config,
          logo: {
            ...logo,
            url: logoSrc,
          },
          handler: {
            ...handler,
            url: handlerSrc,
          },
          source: {
            url: '',
          },
          models: manifest.config.models.map((model) => {
            const logo = model.logo;
            if (!logo) {
              return model;
            }

            const { src, ...rest } = logo;

            return {
              ...model,
              logo: model.logo
                ? {
                    ...rest,
                    url: src,
                  }
                : undefined,
            };
          }),
        },
      };

      this.logger.debug(
        `Calling VM-X API endpoint /workspace/ai-provider/publish/prepare, payload: ${JSON.stringify(payload, null, 2)}`,
      );
      const response = await this.axiosInstance.post('/workspace/ai-provider/publish/prepare', payload);

      this.logger.debug(`VM-X API response: ${response.status}`);
      this.logger.debug(`VM-X API response data: ${JSON.stringify(response.data, null, 2)}`);

      return response.data;
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        this.logger.error(
          chalk.red`Error preparing the completion provider for publishing: ${error.response?.data.message}`,
        );
      } else {
        this.logger.error(
          chalk.red`Error preparing the completion provider for publishing: ${(error as Error).message}`,
        );
      }

      process.exit(1);
    }
  }
}
