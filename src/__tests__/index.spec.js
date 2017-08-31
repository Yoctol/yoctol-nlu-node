const ynlu = require('../index');

it('should export public api', () => {
  expect(ynlu.IntentClassifier).toBeDefined();
  expect(ynlu.Client).toBeDefined();
});
