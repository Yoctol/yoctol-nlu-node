const ynlu = require('../index');

it('should export public api', () => {
  expect(ynlu.Client).toBeDefined();
  expect(ynlu.IntentClassifier).toBeDefined();
  expect(ynlu.EntityExtractor).toBeDefined();
});
