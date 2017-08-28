const invariant = require('invariant');

const trainMutation = `
  mutation _($classifierId: Int!) {
    train(classifierId: $classifierId) {
      id
      name
      model_id
      updated_at
      isTraining
    }
  }
`;

const predictMutation = `
  mutation _($classifierId: Int!, $text: String!, $exactly: Boolean) {
    predict(classifierId: $classifierId, text: $text, exactly: $exactly) {
      name
      score
    }
  }
`;

class IntentClassifier {
  constructor({ id, graphql }) {
    this._id = id;

    invariant(graphql, 'Must provide graphql client for NLU service.');
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

    const { data: { train } } = await this._graphql({
      query: trainMutation,
      variables,
    });

    return train;
  }

  async predict(text, exactly = true) {
    const variables = {
      classifierId: this._id,
      text,
      exactly,
    };

    const { data: { predict } } = await this._graphql({
      query: predictMutation,
      variables,
    });

    return predict;
  }
}

module.exports = IntentClassifier;
