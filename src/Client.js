const IntentClassifier = require('./IntentClassifier');
const graphql = require('./utils/graphql');

class Client {
  constructor(token) {
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

  async createClassifier(name) {
    const variables = {
      input: {
        name,
      },
    };
    const {
      data: { createClassifier: { classifier: { id } } },
    } = await graphql(this._createClassifierMutation, variables);
    return new IntentClassifier({
      id,
      name,
      token: this._token,
    });
  }
}

module.exports = Client;
