export interface Civ {
  id: number;
  name: string;
  uniqueUnit: string;
}

export interface Map {
  id: number;
  name: string;
  img: string;
}

export interface Action {
  scope: ActionScope;
  object: ActionObject;
  type: ActionType;
  visibility: ActionVisibility;
  captain: Captains;
}

export interface Draft {
  name: string;
  actions: Action[];
  globalCivBans: number[];
  mapPool: number[];
}

export enum Captains {
  CAP_1 = 1,
  CAP_2 = 2,
  ADMIN = 3,
}

export enum ActionObject {
  MAP = 'M',
  CIV = 'C',
  ALL = 'A',
  BAN = 'B',
}

export enum ActionType {
  BAN = 'B',
  PICK = 'P',
  REVEAL = 'R',
}

export enum ActionScope {
  GLOBAL = 'G', // Prevents all captains from choosing the same choice
  EXCLUSIVE = 'E', // Prevents only the captain that chose from choosing the same thing
  NONE = '_',
}

export enum ActionVisibility {
  HIDDEN = 'H',
  VISIBLE = 'V',
  NONE = '_',
}

export enum Role {
  SPECTATOR = 'spectator',
  CAPTAIN_1 = 'captain1',
  CAPTAIN_2 = 'captain2',
}

export enum DraftState {
  WAITING,
  IN_PROGRESS,
  FINISHED,
}

export interface CaptainInfo {
  name?: string;
  loaded: boolean;
  ready: boolean;
}

export interface DraftInfo {
  state: DraftState;
  numSpectators: number;
  token: string;
  currentActionIdx: number;
  captain1: CaptainInfo;
  captain2: CaptainInfo;
}
