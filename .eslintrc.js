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
        "react/react-in-jsx-scope": "off",
        'object-curly-spacing': ['error', 'always'],
        'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }],
        'react/jsx-indent': [2, 2],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'metro.config.js'],
};
