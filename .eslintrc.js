module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-control-regex': 'off',
    'no-cond-assign': 'off',
    'no-useless-escape': 'off',
    'no-empty': 'off',
    'no-undef': 'off',
    'no-self-assign': 'off',
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off'
  }
}
