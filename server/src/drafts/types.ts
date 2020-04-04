import { Action, Draft, DraftState } from '@icm/shared/types';

export interface ActiveAction extends Action {
  value?: number;
}

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
  actionsTaken: ActiveAction[];
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
  token: string;
  captainToken: string;
  name: string;
}

export interface JoinSpectator {
  token: string;
}

export interface CanJoin {
  result: boolean;
  reason?: string;
}
