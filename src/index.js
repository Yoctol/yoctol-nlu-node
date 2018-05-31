const Client = require('./Client');
const IntentClassifier = require('./IntentClassifier');
const EntityExtractor = require('./EntityExtractor');

exports.Client = Client;
exports.IntentClassifier = IntentClassifier;
exports.EntityExtractor = EntityExtractor;

module.exports = {
  Client,
  IntentClassifier,
  EntityExtractor,
};
