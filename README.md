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
const client = NLUClient.connect(process.env.TOKEN);

async function train() {
  const classifier = await client.createClassifier('my_classifier');

  const [intentWantToBuy, intentWhatToEat] = await classifier.createIntents(['想購物', '吃什麼']);

  await classifier.createUtterances(intentWantToBuy.id, ['我想買誒']);
  await classifier.createUtterances(intentWhatToEat.id, ['推薦吃什麼好']);

  await classifier.train();
}

async function predict() {
  const classifier = client.findClassifierById('...');
  const result = await classifier.predict('買給我好不好');
}
```
