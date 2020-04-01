import { Draft, Civ, Map, Role } from '../types';

export interface DataState {
  civs: Civ[];
  maps: Map[];
  names: string[];
  presets: Draft[];
  captainName?: string;
  nameConfirmed: boolean;
}

export interface DraftState {
  activeDraftStep: number;
  activeDraftToken?: string;
  activeDraftConfig?: Draft;
  role?: Role;
}
