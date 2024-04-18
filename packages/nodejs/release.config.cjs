const { defineConfig } = require('../../release.base.config');

const name = 'nodejs';
const srcRoot = `packages/nodejs`;

module.exports = defineConfig(name, srcRoot);
