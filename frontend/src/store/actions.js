import * as dataService from '../services/data';

export const ACTIONS = {
  SET_MAPS: 'data/set-maps',
  SET_CIVS: 'data/set-civs',
  SET_NAMES: 'data/set-names',
  SET_CAPTAIN_NAME: 'data/set-captain-name',
};

const setMaps = (maps) => ({
  type: ACTIONS.SET_MAPS,
  maps,
});

const setCivs = (civs) => ({
  type: ACTIONS.SET_CIVS,
  civs,
});

const setNames = (names) => ({
  type: ACTIONS.SET_NAMES,
  names,
});

const setCaptainName = (name) => ({
  type: ACTIONS.SET_CAPTAIN_NAME,
  name,
});

export const getMaps = () => async (dispatch) => {
  const maps = await dataService.getMaps();
  dispatch(setMaps(maps));
};

export const getCivs = () => async (dispatch) => {
  const civs = await dataService.getCivilizations();
  dispatch(setCivs(civs));
};

export const getNames = () => async (dispatch) => {
  const names = await dataService.getNames();
  dispatch(setNames(names));
};

export const changeCaptainName =  (newName) => (dispatch) => {
  dispatch(setCaptainName(newName));
};
