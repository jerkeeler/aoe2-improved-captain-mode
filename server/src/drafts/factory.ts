import { Draft, DraftState } from '@icm/shared/types';

import { utc } from 'moment';

import { ActiveDraft, Captain } from './types';

function createCaptain(): Captain {
  return {
    token: undefined,
    name: undefined,
    loaded: false,
    ready: false,
    bans: [],
    picks: [],
  };
}

export function createActiveDraft(token: string, draftConfig: Draft): ActiveDraft {
  return {
    state: DraftState.WAITING,
    numSpectators: 0,
    token: token,
    draftConfig: draftConfig,
    currentActionIdx: -1,
    captain1: createCaptain(),
    captain2: createCaptain(),
    timer: -1,
    timerId: undefined,
    actionsTaken: [],
    startTime: utc().valueOf(),
  };
}
