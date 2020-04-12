import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActionObject,
  Captains,
  Draft,
  DraftInfo,
  DraftState as ActiveDraftState,
  Role,
  ServerDraftEvent,
  ActionScope,
} from '@icm/shared/types';

import * as draftService from '../services/drafts';
import { DraftState } from './types';
import { AppThunk } from './index';

const initialState: DraftState = {
  // Provided by backend
  draftInfo: {
    state: ActiveDraftState.WAITING,
    numSpectators: 0,
    token: '-1',
    currentActionIdx: -1,
    captain1: {
      loaded: false,
      ready: false,
      captain: Captains.CAP_1,
    },
    captain2: {
      loaded: false,
      ready: false,
      captain: Captains.CAP_2,
    },
  },
  availableRoles: [],
  activeDraftToken: undefined,
  activeDraftConfig: undefined,
  role: undefined,
  countdown: -1,
  serverEvents: [],

  // Frontend state
  captain1: {
    captain: Captains.CAP_1,
    picks: [],
    bans: [],
  },
  captain2: {
    captain: Captains.CAP_2,
    picks: [],
    bans: [],
  },
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
    setCountdown: (state, action: PayloadAction<{ countdown: number }>) => {
      state.countdown = action.payload.countdown;
    },
    addServerEvent: (state, action: PayloadAction<{ event: ServerDraftEvent }>) => {
      state.serverEvents.push(action.payload.event);
    },
    addPick: (
      state,
      action: PayloadAction<{ captain: Captains; object: ActionObject; scope: ActionScope; value: number }>,
    ) => {
      const { captain, object, value, scope } = action.payload;
      const cap = state.captain1.captain === captain ? state.captain1 : state.captain2;
      cap.picks.push({ object, value, scope });
    },
    addBan: (
      state,
      action: PayloadAction<{ captain: Captains; object: ActionObject; scope: ActionScope; value: number }>,
    ) => {
      const { captain, object, value, scope } = action.payload;
      const cap = state.captain1.captain === captain ? state.captain1 : state.captain2;
      cap.bans.push({ object, value, scope });
    },
  },
});

export const { setRole, setDraftInfo, setCountdown, clearState } = slice.actions;

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

export const processServerEvent = (serverEvent: ServerDraftEvent): AppThunk => (dispatch) => {
  dispatch(slice.actions.addServerEvent({ event: serverEvent }));
  // TODO: Handle reveal events
  if (serverEvent.captain === Captains.ADMIN) return;

  // TODO: Handle map bans
  serverEvent.civBans.forEach((civBan) => {
    dispatch(
      slice.actions.addBan({
        captain: serverEvent.captain,
        object: serverEvent.object,
        value: civBan,
        scope: serverEvent.scope,
      }),
    );
  });

  serverEvent.civPicks.forEach((civPick) => {
    dispatch(
      slice.actions.addPick({
        captain: serverEvent.captain,
        object: serverEvent.object,
        value: civPick,
        scope: serverEvent.scope,
      }),
    );
  });
};

export default slice.reducer;
