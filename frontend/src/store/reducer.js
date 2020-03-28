import { ACTIONS } from './actions';
import { randomEl } from '../random';

const initialState = {
  civs: [],
  maps: [],
  names: [],
  captainName: null,
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.SET_CIVS:
      return {...state, civs: action.civs};
    case ACTIONS.SET_MAPS:
      return {...state, maps: action.maps};
    case ACTIONS.SET_NAMES:
      return {...state, names: action.names, captainName: randomEl(action.names)};
    case ACTIONS.SET_CAPTAIN_NAME:
      return {...state, captainName: action.name};
    default:
      return state;
  }
};

export default reducer;
