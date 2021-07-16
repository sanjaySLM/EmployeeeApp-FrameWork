module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': [
      'warn',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
    'react/display-name': ['off', {ignoreTranspilerName: true}],
    'react/prop-types': 0,
    'no-useless-catch': 'off',
    'no-case-declarations': 'off',
    'no-console': 'error',
    quotes: [
      'error',
      'single',
      {allowTemplateLiterals: true, avoidEscape: true},
    ],
    semi: ['error', 'always'],
  },
};
