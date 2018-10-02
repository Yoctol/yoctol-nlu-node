const schema = require('./schema.json');

module.exports = {
  extends: ['yoctol-base'],
  plugins: ['graphql'],
  env: {
    node: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'no-param-reassign': 'off',
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: schema,
      },
    ],
  },
};
