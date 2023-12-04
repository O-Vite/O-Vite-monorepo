module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin',  'functional'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/*', 'node_modules/*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/quotes": 0,
    "array-callback-return": "error",
    "no-constructor-return": "error",
    "no-unused-vars": "off",
    "no-duplicate-imports": "off",
    "no-new-native-nonconstructor": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",
    "no-unused-private-class-members": "error",
    "class-methods-use-this": "off",
    "consistent-return": "error",
    "default-case": "error",
    "dot-notation": "error",
    "eqeqeq": "error",
    "init-declarations": "error",
    "no-eq-null": "error",
    "no-extend-native": "error",
    "no-implicit-coercion": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "indent": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-implicit-globals": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-var": "error",
    "prefer-object-spread": "error",
    "require-await": "off",
    "yoda": "error",
    "explicit-function-return-type": "off",
    "sort-keys": "off",
    "no-undef-init": "off"
  },
};
