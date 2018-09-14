const invariant = require('invariant');

const IntentClassifier = require('./IntentClassifier');
const EntityExtractor = require('./EntityExtractor');
const createFetchFromToken = require('./utils/createFetchFromToken');

class Client {
  constructor(token, options) {
    invariant(token, 'Must provide access token for NLU service.');
    this._graphql = createFetchFromToken(token, options);
  }

  createProject() {
    // Todo
  }

  findProjectById() {
    // Todo
  }

  findClassifierById(_id) {
    invariant(/^[0-9]+$/.test(_id), 'id should be string of number');

    return new IntentClassifier({
      id: _id,
      graphql: this._graphql,
    });
  }

  findExtractorById(_id) {
    invariant(/^[0-9]+$/.test(_id), 'id should be string of number');

    const classifer = this.findClassifierById(_id);

    return new EntityExtractor({
      id: _id,
      classifer,
    });
  }
}

module.exports = {
  connect(token, options) {
    return new Client(token, options);
  },
};
