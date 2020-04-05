import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Captains, Draft, DraftInfo, DraftState as ActiveDraftState, Role } from '@icm/shared/types';

import * as draftService from '../services/drafts';
import { DraftState } from './types';
import { AppThunk } from './index';

const initialState: DraftState = {
  draftInfo: {
    state: ActiveDraftState.WAITING,
    numSpectators: 0,
    token: '-1',
    currentActionIdx: -1,
    captain1: {
      loaded: false,
      ready: false,
    },
    captain2: {
      loaded: false,
      ready: false,
    },
  },
  availableRoles: [],
  activeDraftToken: undefined,
  activeDraftConfig: undefined,
  role: undefined,
};

interface ActiveDraftIno {
  draftToken: string;
  draftConfig: Draft;
  availableRoles: Role[];
}

export const slice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    clearState: () => initialState,
    setActiveDraftInfo: (state, action: PayloadAction<ActiveDraftIno>) => {
      state.activeDraftToken = action.payload.draftToken;
      state.activeDraftConfig = action.payload.draftConfig;
      state.availableRoles = action.payload.availableRoles;
    },
    setRole: (state, action: PayloadAction<{ role: Role }>) => {
      state.role = action.payload.role;
    },
    setDraftInfo: (state, action: PayloadAction<{ draftInfo: DraftInfo }>) => {
      state.draftInfo = action.payload.draftInfo;
    },
  },
});

export const { setRole, setDraftInfo } = slice.actions;

export const getDraftInfo = (draftToken: string): AppThunk => async (dispatch) => {
  const { availableRoles, draftConfig } = await draftService.getDraftInfo(draftToken);
  dispatch(
    slice.actions.setActiveDraftInfo({
      draftToken,
      draftConfig: draftConfig,
      availableRoles: availableRoles,
    }),
  );
};

export default slice.reducer;
