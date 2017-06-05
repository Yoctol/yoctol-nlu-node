const { NLUClient } = require('../src');

// put your token into client
const client = new NLUClient(process.env.TOKEN);

async function run() {
  const classifier = await client.createClassifier('my_classifier');

  const intents = await classifier.createIntents(['想購物', '吃什麼']);

  const intentWantToBuy = intents[0];
  const intentWhatToEat = intents[1];

  await classifier.createUtterances(intentWantToBuy.id, ['我想買誒']);
  await classifier.createUtterances(intentWhatToEat.id, ['推薦吃什麼好']);

  await classifier.train();

  await new Promise(resolve => setTimeout(resolve, 5000));

  const result = await classifier.predict('買給我好不好');
}

run();
