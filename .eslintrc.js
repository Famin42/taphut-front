module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    ignorePatterns: ["test.ts", "polyfills.ts", "*.prod.ts"]
};