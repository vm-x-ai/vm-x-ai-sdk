const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginVitest = require('eslint-plugin-vitest');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: { parser: require('jsonc-eslint-parser') },
  },

  {
    plugins: {
      '@nx': nxEslintPlugin,
      vitest: eslintPluginVitest,
      import: eslintPluginImport,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: true,
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'] }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      ...config.rules,
      '@typescript-eslint/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    rules: {
      ...config.rules,
      '@typescript-eslint/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })),
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...eslintPluginVitest.configs.recommended.rules,
    },
  },
  { ignores: ['dist', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  {
    files: ['**/package.json', '**/generators.json'],
    rules: { '@nx/nx-plugin-checks': 'error' },
    languageOptions: { parser: require('jsonc-eslint-parser') },
  },
];
