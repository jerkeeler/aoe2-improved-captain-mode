const { DRAFT_STATE, ROLES } = require('../models');
const store = require('./store').store;

function canJoin(token, role) {
  const state = store.getState();
  if (!state.has(token))
    return { result: false, reason: 'Draft does not exist!' };

  const draft = state.get(token);
  if (!draft.get('state') === DRAFT_STATE.WAITING)
    return { result: false, reason: 'Cannot join an ongoing draft!' };
  if (role === ROLES.SPECTATOR || !draft.getIn(['captain1', 'loaded']) || !draft.getIn(['captain2', 'loaded']))
    return { result: true };
  return { result: false, reason: 'All captains are loaded, you cannot join this draft as a captain.'}
}

function draftExists(token) {
  const state = store.getState();
  return state.has(token);
}

module.exports = {
  canJoin,
  draftExists,
};
