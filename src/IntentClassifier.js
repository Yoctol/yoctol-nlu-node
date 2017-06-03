const graphql = require('./utils/graphql');

class IntentClassifier {
  constructor({ id, name, token }) {
    this._id = id;
    this._name = name;
    this._token = token;

    this._createIntentsMutation = `
      mutation _($input: CreateIntentsInput!) {
        useToken(token: "${this._token}") {
          ok
        }
        createIntents(input: $input) {
          intents {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `;

    this._createUtterancesMutation = `
      mutation _($input: CreateUtterancesInput!) {
        useToken(token: "${this._token}") {
          ok
        }
        createUtterances(input: $input) {
          utterances {
            edges {
              node {
                id
                text
              }
            }
          }
        }
      }
    `;

    this._trainMutation = `
      mutation _($input: TrainClassifierInput!) {
        useToken(token: "${this._token}") {
          ok
        }
        trainClassifier(input: $input) {
          classifier {
            isTraining
          }
        }
      }
    `;

    this._predictMutation = `
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

  get name() {
    return this._name;
  }

  async createIntents(intents) {
    const variables = {
      input: {
        classifierId: this._id,
        intentNames: intents,
      },
    };
    const { data: { createIntents: { intents: { edges } } } } = await graphql(
      this._createIntentsMutation,
      variables
    );

    return edges.map(e => e.node);
  }

  async createUtterances(intentId, utterances) {
    const variables = {
      input: {
        intentId,
        utteranceTexts: utterances,
      },
    };
    return graphql(this._createUtterancesMutation, variables);
  }

  async train() {
    const variables = {
      input: {
        classifierId: this._id,
      },
    };
    await graphql(this._trainMutation, variables);
  }

  async predict(text) {
    const variables = {
      input: {
        classifierId: this._id,
        text,
      },
    };
    const { data: { predict: { predictions: { edges } } } } = await graphql(
      this._predictMutation,
      variables
    );
    return edges
      .map(e => ({ name: e.node.intent.name, score: e.node.score }))
      .sort((a, b) => (a.score < b.score ? 1 : -1));
  }
}

module.exports = IntentClassifier;
