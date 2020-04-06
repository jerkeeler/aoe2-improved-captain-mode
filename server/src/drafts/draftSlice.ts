import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActiveDraft, JoinCaptain, JoinSpectator } from './types';
import { Role, DraftState as ActiveDraftState } from '@icm/shared/types';

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
      const { captainToken, draftToken, name, role } = action.payload;
      const draft = state[draftToken];
      const cap = role === Role.CAPTAIN_1 ? draft.captain1 : draft.captain2;
      cap.loaded = true;
      cap.token = captainToken;
      cap.name = name;
    },
    leaveCaptain: (state, action: PayloadAction<{ draftToken: string; role: Role }>): void => {
      const { role, draftToken } = action.payload;
      const draft = state[draftToken];
      const cap = role === Role.CAPTAIN_1 ? draft.captain1 : draft.captain2;
      cap.loaded = false;
      cap.token = undefined;
      draft.captain1.ready = false;
      draft.captain2.ready = false;
    },
    joinSpectator: (state, action: PayloadAction<JoinSpectator>): void => {
      state[action.payload.token].numSpectators++;
    },
    leaveSpectator: (state, action: PayloadAction<{ draftToken: string }>): void => {
      state[action.payload.draftToken].numSpectators--;
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
    setDraftState: (state, action: PayloadAction<{ draftToken: string; draftState: ActiveDraftState }>): void => {
      const { draftToken, draftState } = action.payload;
      state[draftToken].state = draftState;
    },
    incrementActionIdx: (state, action: PayloadAction<{ draftToken: string }>): void => {
      const { draftToken } = action.payload;
      state[draftToken].currentActionIdx++;
    },
  },
});

export const {
  clearState,
  joinCaptain,
  joinSpectator,
  newDraft,
  readyCaptain,
  leaveSpectator,
  leaveCaptain,
  incrementActionIdx,
  setDraftState,
} = draftSlice.actions;

export default draftSlice.reducer;
