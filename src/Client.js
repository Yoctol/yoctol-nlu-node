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

  async findClassifierById(_id) {
    invariant(/^[0-9]+$/.test(_id), 'id should be string of number');

    const classifierQuery = `{
      classifier(id: "${_id}") {
        id
      }
    }
    `;

    const { data: { classifier } } = await this._graphql({
      query: classifierQuery,
    });

    invariant(classifier, 'classifier is not existed.');

    return new IntentClassifier({
      id: classifier.id,
      graphql: this._graphql,
    });
  }
}

module.exports = {
  connect(token) {
    return new Client(token);
  },
};
