class EntityExtractor {
  constructor({ id, classifer }) {
    this._id = id;

    this._classifer = classifer;
  }

  get id() {
    return this._id;
  }

  async extract(text, exactly = true) {
    const variables = {
      classifierId: this._id,
      text,
      exactly,
    };

    const predict = await this._classifer.predict(variables);

    if (!predict) {
      return null;
    }
    return predict.entities;
  }
}

module.exports = EntityExtractor;
