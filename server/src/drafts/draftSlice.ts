import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActiveDraft, JoinCaptain, JoinSpectator } from './types';

interface DraftState {
  [key: string]: ActiveDraft;
}

const initialState: DraftState = {};

interface ReadyCaptain {
  draftToken: string;
  captainToken: string;
}

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    clearState: (): DraftState => initialState,
    newDraft: (state, action: PayloadAction<ActiveDraft>): void => {
      state[action.payload.token] = action.payload;
    },
    joinCaptain: (state, action: PayloadAction<JoinCaptain>): void => {
      const cap = !state[action.payload.token].captain1.loaded ? 'captain1' : 'captain2';
      state[action.payload.token][cap].loaded = true;
      state[action.payload.token][cap].token = action.payload.captainToken;
      state[action.payload.token][cap].name = action.payload.name;
    },
    joinSpectator: (state, action: PayloadAction<JoinSpectator>): void => {
      state[action.payload.token].numSpectators++;
    },
    readyCaptain: (state, action: PayloadAction<ReadyCaptain>): void => {
      const { captainToken, draftToken } = action.payload;
      const draft = state[draftToken];
      let cap;
      if (captainToken === draft.captain1.token) cap = draft.captain1;
      else if (captainToken === draft.captain2.token) cap = draft.captain2;

      if (!cap) return;
      cap.ready = true;
    },
  },
});

export const { clearState, joinCaptain, joinSpectator, newDraft, readyCaptain } = draftSlice.actions;

export default draftSlice.reducer;
