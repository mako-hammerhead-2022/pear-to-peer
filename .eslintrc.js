module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
      alias: {
        map: [
          ['@', './client'],
          ['@test', './test'],
        ],
      },
      extensions: ['.js', '.jsx', '.css'],
    },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
    'vitest-globals/env': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:vitest-globals/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-var-requires': 'off',
  },
}
