module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",

    "eol-last": "error",
    "id-length": "error",
    "max-len": [
      "error",
      {
        code: 80,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-cond-assign": ["error", "always"],
    "no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^[req|res|next]",
      },
    ],
    "no-useless-catch": "error",
    "no-return-await": "error",
    "no-trailing-spaces": "error",
    "no-var": "error",
    "prefer-const": ["error", { destructuring: "all" }],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
};
