import { Draft, Civ, Map, Role, Captains } from '@icm/shared/types';

export interface DataState {
  civs: Civ[];
  maps: Map[];
  names: string[];
  presets: Draft[];
  captainName?: string;
  nameConfirmed: boolean;
}

export interface DraftState {
  availableRoles: Role[];
  activeDraftToken?: string;
  activeDraftConfig?: Draft;
  role?: Role;
  you?: Captains;
}
