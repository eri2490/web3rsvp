module.exports = {
  env: {
      browser: true,
      es2021: true,
  },
  extends: [
      "eslint:recommended",
      "plugin:react/recommended",
  ],
  parserOptions: {
      ecmaFeatures: {
          jsx: true,
      },
      sourceType: "module",
  },
  plugins: ["react"],
  ignorePatterns: [".eslintrc.js"],
  settings: {
      "react": {
          "version": "detect",
      },
  },
  rules: {
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "block-spacing": ["error", "always"],                     // どちらでも良いが統一したいのでスペースありとする
      "object-curly-spacing": ["error", "always"],              // block-spacingにあわせてスペースありとする
      "comma-dangle": ["error", {                               // 要素の追加のしやすさを考慮し、Objectのみカンマありとする
          "objects": "only-multiline",
      }],
      "no-console": "warn",                                     // ログ出力箇所の視認性のため、warnとする
      "react/react-in-jsx-scope": "off",                        // React v17からはReactのimportが不要になったので、importの確認ルールを無効にする
  },
}
