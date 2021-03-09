module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    ecmaFeatures: {
        jsx: true
    },
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "global-require": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "variables": false,
        "classes": false
      }
    ],
  }
};
