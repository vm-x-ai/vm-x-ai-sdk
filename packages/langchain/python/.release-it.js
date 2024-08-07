const { whatBump } = require('../../../release/util');

const version = '${version}';
const packageName = 'langchain-python';

module.exports = {
  plugins: {
    '@release-it/conventional-changelog': {
      path: '.',
      infile: 'CHANGELOG.md',
      preset: 'conventionalcommits',
      whatBump,
      gitRawCommitsOpts: {
        path: '.',
      },
    },
    '@release-it/bumper': {
      in: {
        file: 'pyproject.toml',
        type: 'text/plain',
      },
      out: {
        file: 'pyproject.toml',
        type: 'text/plain',
      },
    },
  },
  git: {
    push: true,
    tagName: `${packageName}-v${version}`,
    commitsPath: '.',
    commitMessage: `chore(${packageName}): released version v${version} [no ci]`,
    requireCommits: true,
    requireCommitsFail: false,
    requireUpstream: false,
    requireCleanWorkingDir: false,
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: `${packageName}-v${version}`,
  },
  hooks: {
    'before:git:release': [
      'cd ../../..; pnpm nx format',
      `cd ../../..; pnpm nx run ${packageName}:publish -vvv`,
      'git add --all',
    ],
  },
};
