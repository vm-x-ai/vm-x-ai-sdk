const version = '${version}';
const packageName = 'python';

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
      in: 'pyproject.toml',
      out: 'pyproject.toml',
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
    publish: false,
  },
  github: {
    release: true,
    releaseName: `${packageName}-v${version}`,
  },
  hooks: {
    'before:git:release': ['cd ../..; pnpm nx format', 'git add --all'],
    'after:bump': ['pnpm nx run python:build'],
  },
};
