module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'curly': 'off',
        'prettier/prettier': 0,
        'react/jsx-wrap-multilines': 'off',
        'react/react-in-jsx-scope': 'off',
        'object-curly-spacing': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        'react/jsx-indent': [2, 2],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react-native/no-inline-styles': 'off',
        'max-len': ['error', { 'code': 100 }],
        'eslint-comments/no-unlimited-disable': 'off',
        'no-new': 'off',
        'indent': ['error', 2],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'metro.config.js'],
};
