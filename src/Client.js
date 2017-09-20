const invariant = require('invariant');

const IntentClassifier = require('./IntentClassifier');
const createFetchFromToken = require('./utils/createFetchFromToken');

class Client {
  constructor(token) {
    invariant(token, 'Must provide access token for NLU service.');
    this._graphql = createFetchFromToken(token);
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
}

module.exports = {
  connect(token) {
    return new Client(token);
  },
};
