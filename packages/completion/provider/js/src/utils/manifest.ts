import fs from 'fs';
import { load as loadYaml } from 'js-yaml';
import type { AIProviderConfig } from '../types';

export const readManifest = (path: string): AIProviderConfig => {
  if (!fs.existsSync(path)) {
    throw new Error(`Manifest file ${path} does not exist`);
  }

  const manifestContent = fs.readFileSync(path, 'utf8');

  let manifest: AIProviderConfig;
  try {
    manifest = loadYaml(manifestContent) as AIProviderConfig;
  } catch (error) {
    throw new Error(`Error parsing manifest file: ${(error as Error).message}`);
  }

  if (fs.existsSync('./package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    manifest.version = packageJson.version;
  }

  return manifest;
};
