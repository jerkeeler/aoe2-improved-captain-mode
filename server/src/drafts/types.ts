import { Action, Draft, DraftState } from '../models';

export interface ActiveDraft {
  state: DraftState;
  numSpectators: number;
  token: string;
  draftConfig: Draft;
  currentActionIdx: -1;
  captain1: Captain;
  captain2: Captain;
  timer: number;
  timerId: number | undefined;
  actionsTaken: Action[];
  startTime: Date;
}

export interface Captain {
  token: string | undefined;
  name: string | undefined;
  loaded: boolean;
  ready: boolean;
  bans: number[];
  picks: number[];
}

export interface JoinCaptain {
  token: string;
  captainToken: string;
  name: string;
}

export interface JoinSpectator {
  token: string;
}

export interface CanJoin {
  result: boolean;
  reason: string;
}
