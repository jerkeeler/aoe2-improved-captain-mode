import { ACTIONS } from './actions';

const initialState = {
  civs: [],
  maps: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.SET_CIVS:
      return {...state, civs: action.civs};
    case ACTIONS.SET_MAPS:
      return {...state, maps: action.maps};
    default:
      return state;
  }
};

export default reducer;
