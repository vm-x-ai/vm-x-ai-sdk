import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { aiProviderGenerator } from './generator';
import type { AiProviderGeneratorSchema } from './schema';

describe('ai-provider generator', () => {
  let tree: Tree;
  const options: AiProviderGeneratorSchema = {
    name: 'dummy',
    directory: 'packages/dummy',
    providerType: 'community',
    providerVisibility: 'private',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await aiProviderGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'dummy');
    expect(config).toMatchSnapshot();
    expect(tree.listChanges().map((change) => change.path)).toMatchSnapshot();
  });
});
