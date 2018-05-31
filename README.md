# yoctol-nlu-node

Yoctol Natural Language Understanding SDK for Node.js

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
const { Client } = require('ynlu');

// put your token into client
const client = Client.connect(process.env.TOKEN);

async function train() {
  const classifier = client.findClassifierById('...');
  const result = await classifier.train();
}

async function predict() {
  const classifier = client.findClassifierById('...');
  // the second parameter is Boolean, represent exactly match or not
  // default to true
  const result1 = await classifier.predict('買給我好不好'); // exactly match = true
  const result2 = await classifier.predict('買給我好不好', true);
  const result3 = await classifier.predict('買給我好嗎', false);
}

async function extract() {
  const extractor = client.findExtractorById('...');

  const entities = await extractor.extract('買給我好不好'); 
}
```
