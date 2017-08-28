const { Client } = require('../src');

// put your token into client
const client = Client.connect(process.env.TOKEN);

async function run() {
  const classifier = client.findClassifierById('...');
  const result = await classifier.predict('買給我好不好');
  console.log(result);
}

run();
