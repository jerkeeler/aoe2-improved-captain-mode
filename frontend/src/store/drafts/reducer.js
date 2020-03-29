import { DRAFT_ACTIONS } from './actions';

const initialState = {
  activeDraftStep: -1,
  activeDraftToken: null,
  activeDraftConfig: null,
  role: null,
  draftPresets: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case DRAFT_ACTIONS.CLEAR_STATE:
      return {...initialState, draftPresets: state.draftPresets};
    case DRAFT_ACTIONS.SET_PRESETS:
      return {...state, draftPresets: action.presetDrafts};
    case DRAFT_ACTIONS.SET_ACTIVE_DRAFT_INFO:
      return {
        ...state,
        activeDraftToken: action.token,
        activeDraftConfig: action.draftConfig,
        role: action.role,
      };
    default:
      return state;
  }
};

export default reducer;

