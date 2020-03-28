const { randomToken } = require('../random');
const { SameTokenError } = require('../xceptions');
const { ActiveDraft } = require('../models');

class Store {
  constructor() {
    this.state = {};
  }

  newDraft = (draftConfig) => {
    const token = randomToken();
    if (this.state[token])
      throw new SameTokenError(token);

    this.state[token] = new ActiveDraft(token, draftConfig);
    return token;
  };

  loadCaptain1 = (token) => {
    this.state[token].captain1.loaded = true;
  };

  loadCaptain2 = (token) => {
    this.state[token].captain2.loaded = true;
  };
}

const draftStore = new Store();

module.exports = draftStore;
