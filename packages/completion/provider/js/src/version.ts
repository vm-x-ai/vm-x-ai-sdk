import fs from 'fs';
import path from 'path';

export function getPackageVersion(): string {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Cannot find package.json at ${packageJsonPath}`);
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).version;
}
