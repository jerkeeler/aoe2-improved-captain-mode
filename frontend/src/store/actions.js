import * as dataService from '../services/data';
import * as draftsService from '../services/drafts';

import { loadDraft } from '../models';

export const ACTIONS = {
  SET_MAPS: 'data/set-maps',
  SET_CIVS: 'data/set-civs',
  SET_PRESETS: 'drafts/set-presets',
};

const setMaps = (maps) => ({
  type: ACTIONS.SET_MAPS,
  maps,
});

const setCivs = (civs) => ({
  type: ACTIONS.SET_CIVS,
  civs,
});

const setPresets = (presetDrafts) => ({
  type: ACTIONS.SET_PRESETS,
  presetDrafts,
});

export const getMaps = () => async (dispatch) => {
  const maps = await dataService.getMaps();
  dispatch(setMaps(maps));
};

export const getCivs = () => async (dispatch) => {
  const civs = await dataService.getCivilizations();
  dispatch(setCivs(civs));
};

export const getDraftPresets = () => async (dispatch) => {
  const presetDrafts = await draftsService.getPresets();
  dispatch(setPresets(presetDrafts));
};
