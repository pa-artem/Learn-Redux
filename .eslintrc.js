module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/require-default-props': 'off',
    'no-restricted-syntax': 'off',
    'no-useless-constructor': 'off',
    'no-continue': 'off',
    'operator-linebreak': 'off',
    'no-await-in-loop': 'off',
    'react/prop-types': 'off',
    eqeqeq: 'off',

    // these conflict with prettier formatting
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-wrap-multilines': 'off',

    // use @typescript-eslint/no-shadow instead
    'no-shadow': 'off',

    // conflicts with redux toolkit and immer.js
    'no-param-reassign': 'off',

    // a bug in airbnb 19.0.2 eslint config
    'react/function-component-definition': [
      2,
      {
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        '@app': './src/app',
        '@features': './src/features',
        '@hooks': './src/hooks',
        '@ui-components': './src/ui-components',
        '@global-styles': './src/global-styles',
      },
    },
  },
};
