module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'func-names': ['error', 'never'],
    'no-useless-escape': 'off',
  },
};
