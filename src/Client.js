const invariant = require('invariant');

const IntentClassifier = require('./IntentClassifier');
const graphql = require('./utils/graphql');

class Client {
  constructor(token) {
    invariant(token, 'Must provide access token for NLU service.');
    this._token = token;

    this._createClassifierMutation = `
      mutation _($input: CreateClassifierInput!) {
        useToken(token: "${this._token}") {
          ok
        }
        createClassifier(input: $input) {
          classifier {
            id
          }
        }
      }
    `;
  }

  connect(token) {
    return new Client(token);
  }

  async createClassifier(name) {
    const variables = {
      input: {
        name,
      },
    };

    const { data: { createClassifier } } = await graphql(
      this._createClassifierMutation,
      variables
    );

    invariant(createClassifier, 'createClassifier: Something goes wrong.');

    const { classifier: { id } } = createClassifier;

    return new IntentClassifier({
      id,
      token: this._token,
    });
  }

  findClassifierById(id) {
    return new IntentClassifier({
      id,
      token: this._token,
    });
  }
}

module.exports = Client;
