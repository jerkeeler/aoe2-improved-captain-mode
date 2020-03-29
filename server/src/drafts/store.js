const { randomToken } = require('../random');
const { SameTokenError } = require('../xceptions');
const { DRAFT_STATE, ROLES, ActiveDraft } = require('../models');

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

  canJoin = (token, role)  => {
    if (!this.state[token])
      return { result: false, reason: 'Draft does not exist!' };

    const draft = this.state[token];
    if (!draft.state === DRAFT_STATE.WAITING)
      return { result: false, reason: 'Cannot join an ongoing draft!' };
    if (role === ROLES.SPECTATOR || !draft.captain1.loaded || !draft.captain2.loaded)
      return { result: true };
    return { result: false, reason: 'All captains are loaded, you cannot join this draft as a captain.'}
  };

  joinCaptain = (token, captainToken, name) => {
    const draft = this.state[token];
    const cap = draft.captain1.loaded ? draft.captain2 : draft.captain1;
    cap.loaded = true;
    cap.token = captainToken;
    cap.name = name;
  };

  joinSpec = (token) => {
    const draft = this.state[token];
    draft.numSpectators++;
  };
}

const draftStore = new Store();

module.exports = draftStore;
