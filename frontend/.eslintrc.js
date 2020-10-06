module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'prettier/prettier': [
      'error',
      { semi: false, printWidth: 120, trailingComma: 'all', singleQuote: true, arrowParens: 'avoid' },
    ],
  },
}
