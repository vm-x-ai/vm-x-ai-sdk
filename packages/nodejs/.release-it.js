const version = '${version}';
const packageName = 'nodejs';

module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      path: '.',
      infile: 'CHANGELOG.md',
      preset: 'conventionalcommits',
      gitRawCommitsOpts: {
        path: '.',
      },
    },
    '@release-it/bumper': {
      in: 'package.json',
      out: 'package.json',
    },
  },
  git: {
    push: true,
    tagName: `${packageName}-v${version}`,
    pushRepo: 'git@github.com:vm-x-ai/vm-x-ai-sdk.git',
    commitsPath: '.',
    commitMessage: `feat(${packageName}): released version v${version} [no ci]`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  npm: {
    publish: true,
    publishPath: '../../dist/packages/nodejs',
    versionArgs: ['--allow-same-version', '--workspaces false'],
  },
  github: {
    release: true,
    releaseName: `${packageName}-v${version}`,
  },
  hooks: {
    'before:git:release': ['git add --all'],
    'after:bump': ['pnpm nx run nodejs:build'],
  },
};
