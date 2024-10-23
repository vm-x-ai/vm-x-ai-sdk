import * as path from 'path';
import type { Tree } from '@nx/devkit';
import {
  readProjectConfiguration,
  updateProjectConfiguration,
  formatFiles,
  generateFiles,
  addDependenciesToPackageJson,
  updateJson,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { getPackageVersion } from '@vm-x-ai/completion-provider';
import type { AiProviderGeneratorSchema } from './schema';

export async function aiProviderGenerator(tree: Tree, options: AiProviderGeneratorSchema) {
  const callback = await libraryGenerator(tree, {
    ...options,
    publishable: false,
  });

  const projectConfig = readProjectConfiguration(tree, options.name);
  tree.delete(path.join(projectConfig.root, 'src/lib', `${options.name}.ts`));
  tree.delete(path.join(projectConfig.root, 'src/lib', `${options.name}.spec.ts`));

  updateJson(tree, path.join(projectConfig.root, 'tsconfig.json'), (json) => {
    delete json.compilerOptions.noPropertyAccessFromIndexSignature;
    return json;
  });

  generateFiles(tree, path.join(__dirname, 'files'), projectConfig.root, {
    ...options,
    dot: '.',
    title: options.name
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' '),
  });

  const dependenciesCallback = addDependenciesToPackageJson(
    tree,
    {
      '@nestjs/common': '^10.3.9',
      'nestjs-otel': '6.1.1',
      rxjs: '^7.8.1',
      uuid: '^9.0.1',
      '@vm-x-ai/completion-provider': `^${getPackageVersion()}`,
    },
    {
      'esbuild-plugin-tsc': '^0.4.0',
      '@types/uuid': '^10.0.0',
    },
    undefined,
    true,
  );

  updateProjectConfiguration(tree, options.name, {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'vm-x-completion-ai-provider publish --dry-run',
          cwd: '{projectRoot}',
        },
      },
      publish: {
        executor: 'nx:run-commands',
        options: {
          command: 'vm-x-completion-ai-provider publish',
          cwd: '{projectRoot}',
        },
      },
      watch: {
        executor: 'nx:run-commands',
        options: {
          command: 'vm-x-completion-ai-provider publish --watch',
          cwd: '{projectRoot}',
        },
      },
    },
  });

  await formatFiles(tree);

  return async () => {
    await callback();
    await dependenciesCallback();
  };
}

export default aiProviderGenerator;
