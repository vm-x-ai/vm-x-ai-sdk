module.exports = (config) => {
  config.input = {
    index: `${__dirname}/src/index.ts`,
    'bin/index': `${__dirname}/src/cli/index.ts`,
  };
  return config;
};
