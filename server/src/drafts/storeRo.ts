import { Draft, DraftState, Role } from '../models';
import store from './store';
import { CanJoin } from './types';

export function canJoin(token: string, role: Role): CanJoin {
  const { drafts } = store.getState();
  const state = drafts;
  if (!state[token])
    return { result: false, reason: 'Draft does not exist!' };

  const draft = state[token];
  draft.state;
  if (!(draft.state === DraftState.WAITING))
    return { result: false, reason: 'Cannot join an ongoing draft!' };
  if (role === Role.SPECTATOR || !draft.captain1.loaded || !draft.captain2.loaded)
    return { result: true, reason: '' };
  return { result: false, reason: 'All captains are loaded, you cannot join this draft as a captain.'}
}

export function draftExists(token: string): boolean {
  const { drafts } = store.getState();
  return token in drafts;
}

export function getDraftConfig(token: string): Draft {
  const { drafts } = store.getState();
  return drafts[token].draftConfig;
}

export function areCaptainsReady(token: string): boolean {
  const { drafts } = store.getState();
  const draft = drafts[token];
  return draft.captain1.ready && draft.captain2.ready;
}
