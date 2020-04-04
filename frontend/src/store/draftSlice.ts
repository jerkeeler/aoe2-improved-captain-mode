import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft, Role } from '@icm/shared/types';

import * as draftService from '../services/drafts';
import { DraftState } from './types';
import { AppThunk } from './index';

const initialState: DraftState = {
  availableRoles: [],
  activeDraftToken: undefined,
  activeDraftConfig: undefined,
  role: undefined,
  you: undefined,
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
  },
});

export const { setRole } = slice.actions;

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
