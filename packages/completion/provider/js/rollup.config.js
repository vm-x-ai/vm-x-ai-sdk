module.exports = (config) => {
  config.input = {
    index: `${__dirname}/src/index.ts`,
    'bin/index': `${__dirname}/src/cli/index.ts`,
  };

  for (const output of config.output) {
    output.preserveModules = true;
  }

  return config;
};
