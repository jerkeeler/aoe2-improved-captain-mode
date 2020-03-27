import * as dataService from '../services/data';

export const ACTIONS = {
  SET_MAPS: 'data/set-maps',
  SET_CIVS: 'data/set-civs',
};

const setMaps = (maps) => ({
  type: ACTIONS.SET_MAPS,
  maps,
});

const setCivs = (civs) => ({
  type: ACTIONS.SET_CIVS,
  civs,
});

export const getMaps = () => async (dispatch) => {
  const maps = await dataService.getMaps();
  dispatch(setMaps(maps));
};

export const getCivs = () => async (dispatch) => {
  const civs = await dataService.getCivilizations();
  dispatch(setCivs(civs));
};
