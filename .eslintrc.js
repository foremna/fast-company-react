module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  'rules': {
    'indent': ['error', 2],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never"
    }],
    "prefer-const": ['off'],
    'no-duplicate-imports': ['off'],
    'multiline-ternary': ['off']
  }
}
