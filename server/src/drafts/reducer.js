const { Map } = require('immutable');

const ACTIONS = require('./actionTypes');

const initialState = Map();

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.CLEAR_STATE:
      return initialState;
    case ACTIONS.NEW_DRAFT:
      return state.setIn([action.token], action.draft);
    case ACTIONS.JOIN_CAPTAIN:
      const cap = !state.getIn([action.token, 'captain1', 'loaded']) ? 'captain1' : 'captain2';
      return state.withMutations((s) => {
        s.setIn([action.token, cap, 'loaded'], true)
          .setIn([action.token, cap, 'token'], action.captainToken)
          .setIn([action.token, cap, 'name'], action.name);
      });
    case ACTIONS.JOIN_SPECTATOR:
      return state.setIn([action.token, 'numSpectators'], state.getIn([action.token, 'numSpectators']) + 1);
    case ACTIONS.READY_CAPTAIN:
      if (state.getIn([action.token, 'captain1', 'token']) === action.captainToken)
        return state.setIn([action.token, 'captain1', 'ready'], true);
      else if (state.getIn([action.token, 'captain2', 'token']) === action.captainToken)
        return state.setIn([action.token, 'captain2', 'ready'], true);
    default:
      return state;
  }
};

module.exports = reducer;
