const name = 'python';
const srcRoot = `packages/python`;

module.exports = {
  branches: ['main'],
  pkgRoot: srcRoot,
  tagFormat: `${name}@\${version}`,
  commitPaths: [srcRoot],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${srcRoot}/CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: [
          `node ./tools/scripts/update-poetry-version.js \${nextRelease.version} ./${srcRoot}/pyproject.toml`,
          'pnpm nx format:write --uncommitted',
          'pnpm nx affected:lint --fix',
        ].join(' && '),
        publishCmd: [`pnpm nx run ${name}:publish`],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`${srcRoot}/CHANGELOG.md`, `${srcRoot}/pyproject.toml`],
        message: `chore(${name}): release v\${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
      },
    ],
    [
      '@semantic-release/github',
      {
        addReleases: 'bottom',
        assets: [{ path: 'packages/grpc/protos/completion/completion.proto', label: 'Completion Proto' }],
      },
    ],
  ],
};
