import { Draft, DraftState, Role, ServerDraftEvent } from '@icm/shared/types';

export interface ActiveDraft {
  state: DraftState;
  numSpectators: number;
  token: string;
  draftConfig: Draft;
  currentActionIdx: number;
  captain1: Captain;
  captain2: Captain;
  timer: number;
  timerId?: number;
  serverEvents: ServerDraftEvent[];
  startTime: number;
}

export interface Captain {
  token?: string;
  name?: string;
  loaded: boolean;
  ready: boolean;
  bans: number[];
  picks: number[];
}

export interface JoinCaptain {
  draftToken: string;
  captainToken: string;
  name: string;
  role: Role;
}

export interface JoinSpectator {
  token: string;
}

export interface CanJoin {
  result: boolean;
  reason?: string;
}
