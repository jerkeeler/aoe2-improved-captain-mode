import {
  Draft,
  Civ,
  Map,
  Role,
  DraftInfo,
  ServerDraftEvent,
  ActionObject,
  Captains,
  ActionScope,
} from '@icm/shared/types';

export interface DataState {
  civs: Civ[];
  civsById: {
    [key: number]: Civ;
  };
  maps: Map[];
  mapsById: {
    [key: number]: Map;
  };
  names: string[];
  presets: Draft[];
  captainName?: string;
  nameConfirmed: boolean;
}

export interface CaptainChoice {
  scope: ActionScope;
  object: ActionObject;
  value: number;
}

export interface CaptainDraftInfo {
  captain: Captains;
  picks: CaptainChoice[];
  bans: CaptainChoice[];
}

export interface DraftState {
  // Provided by backend
  draftInfo: DraftInfo;
  availableRoles: Role[];
  activeDraftToken?: string;
  activeDraftConfig?: Draft;
  role?: Role;
  countdown: number;
  serverEvents: ServerDraftEvent[];

  // Frontend state
  captain1: CaptainDraftInfo;
  captain2: CaptainDraftInfo;
}
