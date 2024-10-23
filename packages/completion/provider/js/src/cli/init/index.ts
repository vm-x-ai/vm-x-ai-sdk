import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import type { Logger } from 'pino';
import { generateFiles } from '../../generator';
import { getPackageVersion } from '../../version';
import { BaseCommand } from '../types';

export type InitCommandArgs = {
  name: string;
  type: string;
  visibility: string;
};

export class InitCommand extends BaseCommand<InitCommandArgs> {
  constructor(logger: Logger) {
    super(logger);
  }

  async run(argv: InitCommandArgs) {
    this.logger.info(chalk.bold`Initializing the AI Provider project...\n\n`);

    const distDir = path.join(process.cwd(), argv.name);
    if (fs.existsSync(distDir)) {
      this.logger.error(chalk.red`Directory ${chalk.bold(distDir)} already exists`);
      process.exit(1);
    }

    fs.mkdirSync(distDir, {
      recursive: true,
    });

    const gitInit = spawnSync('git init -q -b main', { stdio: 'inherit', shell: true, cwd: distDir });
    if (gitInit.status !== 0) {
      this.logger.error(chalk.red`Error initializing git repository`);
      process.exit(gitInit.status);
    }

    await generateFiles(path.join(__dirname, 'files'), distDir, {
      ...argv,
      dot: '.',
      providerVersion: getPackageVersion(),
      title: argv.name
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' '),
    });

    this.logger.info(chalk`Running {bold npm install}...`);

    const result = spawnSync('npm install', { stdio: 'inherit', shell: true, cwd: distDir });
    if (result.status !== 0) {
      this.logger.error(chalk.red`Error installing dependencies`);
      process.exit(result.status);
    }

    this.logger.info(chalk.bold`🚀 AI Provider project initialized successfully!`);

    this.logger.info(chalk`\n\nNext steps:`);
    this.logger.info(chalk`  - Run {bold cd ${argv.name}} to navigate to the project directory`);
    this.logger.info(chalk`  - Run {bold npm run test} to run the tests`);
    this.logger.info(chalk`  - Run {bold npm run lint} to lint the project`);
    this.logger.info(chalk`  - Run {bold npm run build} to build/validate the project`);
    this.logger.info(chalk`  - Run {bold npm run watch} to watch for changes and republish the AI Provider`);
    this.logger.info(chalk`  - Run {bold npm run publish} to publish the AI Provider`);
  }
}
