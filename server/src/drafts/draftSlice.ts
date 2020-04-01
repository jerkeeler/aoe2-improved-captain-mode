import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActiveDraft, JoinCaptain, JoinSpectator } from './types';

interface DraftState {
  [key: string]: ActiveDraft;
}

const initialState: DraftState = {};

export const draftSlice =  createSlice({
  name: 'draft',
  initialState,
  reducers: {
    clearState: () => initialState,
    newDraft: (state, action: PayloadAction<ActiveDraft>) => {
      state[action.payload.token] = action.payload;
    },
    joinCaptain: (state, action: PayloadAction<JoinCaptain>) => {
      const cap = state[action.payload.token].captain1.loaded ? 'captain1' : 'captain2';
      state[action.payload.token][cap].loaded = true;
      state[action.payload.token][cap].token = action.payload.captainToken;
      state[action.payload.token][cap].name = action.payload.name;
    },
    joinSpectator: (state, action: PayloadAction<JoinSpectator>) => {
      state[action.payload.token].numSpectators++;
    },
  }
});

export const {
  clearState,
  joinCaptain,
  joinSpectator,
  newDraft,
} = draftSlice.actions;

export default draftSlice.reducer;
