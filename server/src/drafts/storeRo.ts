import { Captains, Draft, DraftState, Role, CaptainInfo, DraftInfo } from '@icm/shared/types';

import store from './store';
import { CanJoin, Captain } from './types';

export function canJoin(token: string, role: Role): CanJoin {
  const { drafts } = store.getState();
  const state = drafts;
  if (!state[token]) return { result: false, reason: 'Draft does not exist!' };

  const draft = state[token];
  draft.state;
  if (!(draft.state === DraftState.WAITING)) return { result: false, reason: 'Cannot join an ongoing draft!' };
  if (role === Role.SPECTATOR || !draft.captain1.loaded || !draft.captain2.loaded) return { result: true };
  return { result: false, reason: 'All captains are loaded, you cannot join this draft as a captain.' };
}

export function draftExists(draftToken: string): boolean {
  const { drafts } = store.getState();
  return draftToken in drafts;
}

interface DraftInfoResponse {
  draftConfig: Draft;
  availableRoles: Role[];
}

export function getDraftConfig(draftToken: string): DraftInfoResponse {
  const { drafts } = store.getState();
  const availableRoles: Role[] = [];
  if (canJoin(draftToken, Role.SPECTATOR).result) availableRoles.push(Role.SPECTATOR);
  if (canJoin(draftToken, Role.CAPTAIN).result) availableRoles.push(Role.CAPTAIN);
  return {
    draftConfig: drafts[draftToken].draftConfig,
    availableRoles,
  };
}

export function areCaptainsReady(draftToken: string): boolean {
  const { drafts } = store.getState();
  const draft = drafts[draftToken];
  return draft.captain1.ready && draft.captain2.ready;
}

function getFrontendCaptainInfo(captain: Captain): CaptainInfo {
  return {
    name: captain.name,
    loaded: captain.loaded,
    ready: captain.ready,
  };
}

export function getFrontendDraftInfo(draftToken: string): DraftInfo {
  const { drafts } = store.getState();
  const draft = drafts[draftToken];

  return {
    state: draft.state,
    numSpectators: draft.numSpectators,
    token: draftToken,
    currentActionIdx: draft.currentActionIdx,
    captain1: getFrontendCaptainInfo(draft.captain1),
    captain2: getFrontendCaptainInfo(draft.captain2),
  };
}

export function getYouInfo(draftToken: string, captainToken?: string): Captains | undefined {
  const { drafts } = store.getState();
  const draft = drafts[draftToken];

  if (captainToken == draft.captain1.token) return Captains.CAP_1;
  if (captainToken === draft.captain2.token) return Captains.CAP_2;
  return undefined;
}
