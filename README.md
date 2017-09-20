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
  const result = await classifier.predict('買給我好不好', true);
}
```
