const invariant = require('invariant');
const gql = require('graphql-tag');

const createErrorFromGraphql = require('./utils/createErrorFromGraphql');

const trainMutation = gql`
  mutation SdkTrain($classifierId: String!) {
    train(classifierId: $classifierId) {
      id
      name
      updated_at
      isTraining
    }
  }
`;

const predictMutation = gql`
  mutation SdkPredict(
    $classifierId: String!
    $text: String!
    $exactly: Boolean
  ) {
    predict(classifierId: $classifierId, text: $text, exactly: $exactly) {
      intents {
        name
        score
      }
      entities {
        name
        value
        score
        parsedResult {
          value
        }
      }
      match {
        isMatched
        score
      }
    }
  }
`;

class IntentClassifier {
  constructor({ id, graphql }) {
    invariant(graphql, 'Must provide graphql client for NLU service.');

    this._id = id;
    this._graphql = graphql;
  }

  get id() {
    return this._id;
  }

  createIntents() {
    // TODO
  }

  createUtterances() {
    // TODO
  }

  async train() {
    const variables = {
      classifierId: this._id,
    };

    const { data, errors } = await this._graphql({
      query: trainMutation,
      variables,
    });

    if (errors) {
      throw createErrorFromGraphql(errors, 'IntentClassifier#train');
    }

    return data.train;
  }

  async predict(text, exactly = true) {
    const variables = {
      classifierId: this._id,
      text,
      exactly,
    };

    const { data, errors } = await this._graphql({
      query: predictMutation,
      variables,
    });

    if (errors) {
      throw createErrorFromGraphql(errors, 'IntentClassifier#predict');
    }

    return data.predict;
  }
}

module.exports = IntentClassifier;
