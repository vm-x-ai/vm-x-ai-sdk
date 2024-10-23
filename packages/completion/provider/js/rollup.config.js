const esmShim = require('@rollup/plugin-esm-shim');

module.exports = (config) => {
  config.input = {
    index: `${__dirname}/src/index.ts`,
    'bin/index': `${__dirname}/src/cli/index.ts`,
  };

  for (const output of config.output) {
    output.preserveModules = true;
  }

  config.plugins = [...config.plugins, esmShim()];

  return config;
};
