module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
      node: true
    },
    plugins: ["prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    parserOptions: { "ecmaVersion": 2020 },
    rules: {
      "no-console": 1,
    }
};