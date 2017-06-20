const { NLUClient } = require('../src');

// put your token into client
const client = NLUClient.connect(process.env.TOKEN);

async function run() {
  const classifier = await client.createClassifier('my_classifier');

  const [intentWantToBuy, intentWhatToEat] = await classifier.createIntents([
    '想購物',
    '吃什麼',
  ]);

  await classifier.createUtterances(intentWantToBuy.id, ['我想買誒']);
  await classifier.createUtterances(intentWhatToEat.id, ['推薦吃什麼好']);

  await classifier.train();

  await new Promise(resolve => setTimeout(resolve, 5000));

  const result = await classifier.predict('買給我好不好');
}

run();
