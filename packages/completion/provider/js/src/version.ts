import packageJson from '../package.json';

export function getPackageVersion(): string {
  return packageJson.version;
}
