const IntentClassifier = require('../IntentClassifier');

const setup = () => {
  const id = '1';
  const graphql = jest.fn();
  const intentClassifier = new IntentClassifier({ id, graphql });

  return {
    id,
    graphql,
    intentClassifier,
  };
};

it('should be defined', () => {
  expect(IntentClassifier).toBeDefined();
});

describe('handle error', () => {
  it('should throw when not provide graphql', () => {
    const createIntentClassifier = () => {
      // eslint-disable-next-line no-new
      new IntentClassifier({ id: '1' });
    };

    expect(createIntentClassifier).toThrowErrorMatchingSnapshot();
  });

  it('should throw error when train error happended', async () => {
    const { intentClassifier, graphql } = setup();

    graphql.mockResolvedValueOnce({
      data: null,
      errors: [new Error('Fake train error message')],
    });

    try {
      await intentClassifier.train();
    } catch (err) {
      expect(err.message).toMatch(/IntentClassifier#train/);
      expect(err).toMatchSnapshot();
    }
  });

  it('should throw error when predict error happended', async () => {
    const { intentClassifier, graphql } = setup();

    graphql.mockResolvedValueOnce({
      data: null,
      errors: [new Error('Fake predict error message')],
    });

    try {
      await intentClassifier.predict();
    } catch (err) {
      expect(err.message).toMatch(/IntentClassifier#predict/);
      expect(err).toMatchSnapshot();
    }
  });
});

describe('instance', () => {
  it('should have id getter', () => {
    const { id, intentClassifier } = setup();

    expect(intentClassifier.id).toBe(id);
  });
});
