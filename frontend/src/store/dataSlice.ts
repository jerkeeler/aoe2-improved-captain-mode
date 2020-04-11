import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Civ, Draft, Map } from '@icm/shared/types';
import { randomEl } from '@icm/shared/random';

import * as storage from '../storage';
import { DataState } from './types';
import { AppThunk } from './index';
import * as dataService from '../services/data';

const initialState: DataState = {
  civs: [],
  civsById: {},
  maps: [],
  mapsById: {},
  names: [],
  presets: [],
  captainName: undefined,
  nameConfirmed: false,
};

export const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCaptainName: (state, action: PayloadAction<string>) => {
      state.nameConfirmed = true;
      state.captainName = action.payload;
      storage.setName(action.payload);
    },
    setCivs: (state, action: PayloadAction<Civ[]>) => {
      state.civs = action.payload;
      const civsById: { [key: string]: Civ } = {};
      action.payload.forEach((c) => (civsById[c.id] = c));
      state.civsById = civsById;
    },
    setMaps: (state, action: PayloadAction<Map[]>) => {
      state.maps = action.payload;
      const mapsById: { [key: string]: Map } = {};
      action.payload.forEach((c) => (mapsById[c.id] = c));
      state.mapsById = mapsById;
    },
    setNames: (state, action: PayloadAction<string[]>) => {
      state.names = action.payload;
      const storedName = storage.getName();
      state.captainName = storedName ? storedName : randomEl(action.payload);
    },
    setPresets: (state, action: PayloadAction<Draft[]>) => {
      state.presets = action.payload;
    },
  },
});

export const { setCaptainName } = slice.actions;

export const getCivs = (): AppThunk => async (dispatch) => {
  const civs = await dataService.getCivilizations();
  dispatch(slice.actions.setCivs(civs));
};

export const getMaps = (): AppThunk => async (dispatch) => {
  const maps = await dataService.getMaps();
  dispatch(slice.actions.setMaps(maps));
};

export const getNames = (): AppThunk => async (dispatch) => {
  const names = await dataService.getNames();
  dispatch(slice.actions.setNames(names));
};

export const getDraftPresets = (): AppThunk => async (dispatch) => {
  const presets = await dataService.getPresets();
  dispatch(slice.actions.setPresets(presets));
};

export default slice.reducer;
