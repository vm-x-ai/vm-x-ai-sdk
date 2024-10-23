import fs from 'fs';
import path from 'path';

export function getPackageVersion(): string {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')).version;
}
