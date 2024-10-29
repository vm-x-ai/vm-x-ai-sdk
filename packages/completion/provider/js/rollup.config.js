const path = require('path');
const esmShim = require('@rollup/plugin-esm-shim');

function updateEsmExports(config) {
  return {
    name: 'update-esm-exports',
    writeBundle: () => {
      const fs = require('fs');
      const packageJson = JSON.parse(fs.readFileSync(`${config.output[0].dir}/package.json`, 'utf8'));
      packageJson.module = './index.js';
      packageJson.types = './index.d.ts';
      packageJson.exports = {
        ...packageJson.exports,
        '.': {
          module: './index.js',
          types: './index.d.ts',
          import: './index.cjs.mjs',
          default: './index.cjs.js',
        },
        './enums': {
          module: './enums.js',
          types: './enums.d.ts',
          import: './enums.cjs.mjs',
          default: './enums.cjs.js',
        },
      };

      fs.writeFileSync(`${config.output[0].dir}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8');
    },
  };
}

module.exports = (config) => {
  const packageRoot = path.relative(process.cwd(), __dirname);
  config.input = {
    index: `${packageRoot}/src/index.ts`,
    enums: `${packageRoot}/src/enums.ts`,
    'bin/index': `${packageRoot}/src/cli/index.ts`,
  };

  for (const output of config.output) {
    output.preserveModules = true;
    output.preserveModulesRoot = path.join(packageRoot);

    if (output.format === 'esm') {
      output.entryFileNames = '[name].js';
      output.chunkFileNames = '[name].js';
    }
  }

  config.plugins = [...config.plugins, esmShim(), updateEsmExports(config)];

  return config;
};
