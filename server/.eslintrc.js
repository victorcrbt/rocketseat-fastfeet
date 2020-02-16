module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        ts: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': 'error',
    'arrow-parens': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts'] },
    ],
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-cycle': 'off',
    strict: 'off',
    indent: 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'comma-dangle': 'off',
    'max-classes-per-file': 'off',
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
      },
    },
  ],
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/resolver': {
      node: {
        paths: ['node_modules', './src'],
        extensions: ['.ts', '.d.ts'],
      },
    },
  },
};
