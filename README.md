# yoctol-nlu-node

Yoctol Natural Language Understanding SDK for nodejs


```sh
$ npm install ynlu
```

```js
const { NLUClient } = require('ynlu');

const client = new NLUClient(token);

async function run() {
  const classifier = await client.createClassifier('my_classifier');

  const intents = await classifier.createIntents(['buy product']);

  const intentBuyProduct = intents[0];

  await classifier.createUtterances(intentBuyProduct.id, [
    '我想買誒',
  ]);

  await classifier.train();

  const result = await classifier.predict('買給我好不好');
}
```
