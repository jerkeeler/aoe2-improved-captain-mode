import { DRAFT_ACTIONS } from './actions';

const initialState = {
  activeDraft: null,
  draftPresets: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case DRAFT_ACTIONS.SET_PRESETS:
      return {...state, draftPresets: action.presetDrafts};
    case DRAFT_ACTIONS.SET_ACTIVE_DRAFT:
      return {...state, activeDraft: action.activeDraft}
    default:
      return state;
  }
};

export default reducer;

