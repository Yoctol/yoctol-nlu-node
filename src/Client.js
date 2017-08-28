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

  findClassifierById(id) {
    // Todo: fetch data from graphql
    return new IntentClassifier({
      graphql: this._graphql,
      id,
    });
  }
}

module.exports = {
  connect(token) {
    return new Client(token);
  },
};
