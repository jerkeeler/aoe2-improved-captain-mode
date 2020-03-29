const { IS_PROD } = require('../consts');
const { SameTokenError } = require('../xceptions');
const { store, dispatch } = require('./store');
const { createActiveDraft } = require('./factory');
const { randomToken } = require('../random');
const ACTIONS = require('./actionTypes');

const clearStateCreator = () => ({ type: ACTIONS.CLEAR_STATE });

const newDraftCreator = (token, draft) => ({
  type: ACTIONS.NEW_DRAFT,
  token,
  draft,
});

const joinCaptainCreator = (token, captainToken, name) => ({
  type: ACTIONS.JOIN_CAPTAIN,
  token,
  captainToken,
  name,
});

const joinSpectatorCreator = (token) => ({
  type: ACTIONS.JOIN_SPECTATOR,
  token,
});

const clearState = () => {
  if (!IS_PROD)  // Don't allow arbitrary clears on prod
    dispatch(clearStateCreator());
};

const createNewDraft = (draftConfig) => {
  const state = store.getState();
  const token = randomToken();
  if (state.getIn([token]))
    throw new SameTokenError(token);

  const draft = createActiveDraft(token, draftConfig);
  dispatch(newDraftCreator(token, draft));
  return token;
};

const joinCaptain = (token, captainToken, name) => {
  dispatch(joinCaptainCreator(token, captainToken, name));
};

const joinSpectator = (token) => {
  dispatch(joinSpectatorCreator(token));
};

module.exports = {
  clearState,
  createNewDraft,
  joinCaptain,
  joinSpectator,
};

