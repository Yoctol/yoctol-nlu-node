# yoctol-nlu-node

Yoctol Natural Language Understanding SDK for nodejs

## Install

```sh
$ npm install ynlu
```

or using yarn:

```sh
$ yarn add ynlu
```

## Usage


```js
const { NLUClient } = require('ynlu');

// put your token into client
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
