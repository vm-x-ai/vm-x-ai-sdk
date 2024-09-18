module.exports = {
  '*': ['pnpm nx format:write'],
  '{packages,docs,tools,secrets}/**/*.{ts,js,jsx,tsx,json,yaml,md,html,css,scss,py}': [
    () => 'pnpm nx affected --target lint --fix',
    "git add ':(glob)**/package.json'",
  ],
};
