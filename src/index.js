const updateNotifier = require('update-notifier');

const pkg = require('../package.json');

const Client = require('./Client');
const IntentClassifier = require('./IntentClassifier');
const EntityExtractor = require('./EntityExtractor');

updateNotifier({ pkg }).notify({ defer: false });

exports.Client = Client;
exports.IntentClassifier = IntentClassifier;
exports.EntityExtractor = EntityExtractor;

module.exports = {
  Client,
  IntentClassifier,
  EntityExtractor,
};
