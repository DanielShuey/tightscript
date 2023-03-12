module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'block-scoped-var': 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-restricted-properties': [
      'error',
      {
        object: 'describe',
        property: 'only',
      },
      {
        object: 'it',
        property: 'only',
      },
    ],
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint', 'import'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {
            allowStaticOnly: true,
          },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              properties: false,
            },
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'classProperty',
            modifiers: ['readonly', 'static'],
            format: ['UPPER_CASE', 'camelCase'],
          },
        ],
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/sort-type-union-intersection-members': 'warn',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unbound-method': 'off',
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': ['error'],
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error'],
        'func-call-spacing': 'off',
        '@typescript-eslint/lines-between-class-members': ['error'],
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-duplicate-imports': ['error'],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['warn'],
        'no-return-await': 'off',
        '@typescript-eslint/return-await': 'error',
        'import/no-cycle': ['error'],
        'import/first': ['error'],
        'import/no-duplicates': ['error'],
        'import/no-namespace': ['error'],
        'import/order': ['error'],
        'import/newline-after-import': ['error'],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
    },
    {
      files: ['test/**/*.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
