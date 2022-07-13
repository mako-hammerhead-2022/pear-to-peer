module.exports = {
  extends: ['eda/react'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/node_modules/**', '**/dist/**'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './client'],
          ['~', '.'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      },
    },
  },
}
