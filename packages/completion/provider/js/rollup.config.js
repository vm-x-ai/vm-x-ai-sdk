const path = require('path');
const esmShim = require('@rollup/plugin-esm-shim');

module.exports = (config) => {
  const packageRoot = path.relative(process.cwd(), __dirname);
  config.input = {
    index: `${packageRoot}/src/index.ts`,
    'bin/index': `${packageRoot}/src/cli/index.ts`,
  };

  for (const output of config.output) {
    output.preserveModules = true;
    output.preserveModulesRoot = path.join(packageRoot);
  }

  config.plugins = [...config.plugins, esmShim()];

  return config;
};
