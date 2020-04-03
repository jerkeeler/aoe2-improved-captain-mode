import { createActiveDraft } from '../factory';
import { DraftState } from '../../models';
import { ActiveDraft } from '../types';

import { validDraft } from '../../../__tests__/fixtures';

const now = jest.fn(() => 1487076708000);

describe('draft factory', () => {
  test('create correct active draft', () => {
    const oldDate = Date.now;
    global.Date.now = now;
    const expectedDraft: ActiveDraft = {
      state: DraftState.WAITING,
      numSpectators: 0,
      token: 'AAAAAA',
      draftConfig: validDraft,
      currentActionIdx: -1,
      captain1: {
        token: undefined,
        name: undefined,
        loaded: false,
        ready: false,
        bans: [],
        picks: [],
      },
      captain2: {
        token: undefined,
        name: undefined,
        loaded: false,
        ready: false,
        bans: [],
        picks: [],
      },
      timer: -1,
      timerId: undefined,
      actionsTaken: [],
      startTime: 1487076708000,
    };

    const actualDraft = createActiveDraft('AAAAAA', validDraft);
    expect(actualDraft).toEqual(expectedDraft);
    global.Date.now = oldDate;
  });
});
