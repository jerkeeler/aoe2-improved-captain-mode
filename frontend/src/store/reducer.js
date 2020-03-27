import { ACTIONS } from './actions';

const initialState = {
  civs: [],
  maps: [],
  draftPresets: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.SET_CIVS:
      return {...state, civs: action.civs};
    case ACTIONS.SET_MAPS:
      return {...state, maps: action.maps};
    case ACTIONS.SET_PRESETS:
      return {...state, draftPresets: action.presetDrafts};
    default:
      return state;
  }
};

export default reducer;
