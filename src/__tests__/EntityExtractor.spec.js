const EntityExtractor = require('../EntityExtractor');

function setup() {
  const classifer = {
    predict: jest.fn(),
  };

  const extractor = new EntityExtractor({
    id: 'id',
    classifer,
  });

  return {
    classifer,
    extractor,
  };
}

it('should return entities if match', async () => {
  const { classifer, extractor } = setup();

  classifer.predict.mockResolvedValue({
    intents: [
      { name: 'placeholder', score: 1 },
      { name: 'other', score: 3.7506804773101976e-8 },
    ],
    entities: [
      {
        name: 'DONT_CARE',
        value: 'I dont care',
        score: 0.9986292208944049,
        parsedResult: null,
      },
    ],
    match: { isMatched: true, score: -6.413192328116722e-7 },
  });

  expect(await extractor.extract('abc', true)).toEqual([
    {
      name: 'DONT_CARE',
      value: 'I dont care',
      score: 0.9986292208944049,
      parsedResult: null,
    },
  ]);
});

it('should return null if no predict result', async () => {
  const { classifer, extractor } = setup();

  classifer.predict.mockResolvedValue(null);

  expect(await extractor.extract('abc', true)).toBeNull();
});
