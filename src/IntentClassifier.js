const axios = require('axios');

const GRAPHQL_ENDPOINT = 'http://139.59.123.66:3000/graphql';

class IntentClassifier {
  constructor({ id, token }) {
    this._id = id;
    this._token = token;
    this._predictQuery = `
      mutation _($input: PredictInput!) {
        useToken(token: "${this._token}") {
          ok
        }
        predict(input: $input) {
          predictions {
            edges {
              node {
                intent {
                  name
                }
                score
              }
            }
          }
        }
      }
    `;
  }

  async predict(text) {
    const body = {
      query: this._predictQuery,
      variables: {
        input: {
          classifierId: this._id,
          text,
        },
      },
    };
    try {
      const {
        data: { data: { predict: { predictions: { edges } } } },
      } = await axios.post(GRAPHQL_ENDPOINT, body);
      return edges
        .map(e => ({ name: e.node.intent.name, score: e.node.score }))
        .sort((a, b) => (a.score < b.score ? 1 : -1));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        console.log(JSON.stringify(err.response.data.errors), null, 2);
      } else {
        throw err;
      }
    }
  }
}

module.exports = IntentClassifier;
