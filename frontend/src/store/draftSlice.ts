import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as draftService from '../services/drafts';
import { DraftState } from './types';
import { Draft, Role } from '../types';
import { AppThunk } from './index';

const initialState: DraftState = {
  activeDraftStep: -1,
  activeDraftToken: undefined,
  activeDraftConfig: undefined,
  role: undefined,
};

interface ActiveDraftIno {
  token: string;
  draftConfig: Draft;
  role: Role;
}

export const slice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    clearState: () => initialState,
    setActiveDraftInfo: (state, action: PayloadAction<ActiveDraftIno>) => {
      state.activeDraftToken = action.payload.token;
      state.activeDraftConfig = action.payload.draftConfig;
      state.role = action.payload.role;
    },
  },
});

export const getDraftConfig = (token: string, role: Role): AppThunk => async (dispatch) => {
  const draftConfig = await draftService.getDraftConfig(token);
  dispatch(slice.actions.setActiveDraftInfo({
    token,
    draftConfig,
    role,
  }));
};

export default slice.reducer;
