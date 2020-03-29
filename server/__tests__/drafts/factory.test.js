const { Map, List } = require('immutable');

const { DRAFT_STATE } = require('../../src/models');
const { createActiveDraft } = require('../../src/drafts/factory');
const validDraft = require('../fixtures').validDraft;

class FakeDate {}

describe('draft factory', () => {
  test('create correct active draft', () => {
    const oldDate = global.Date;
    global.Date = FakeDate;
    const expectedDraft = Map({
      state: DRAFT_STATE.WAITING,
      numSpectators: 0,
      token: 'AAAAAA',
      draftConfig: validDraft,
      currentActionIdx: -1,
      captain1: Map({
        token: null,
        name: null,
        loaded: false,
        ready: false,
        bans: List(),
        picks: List(),
      }),
      captain2: Map({
        token: null,
        name: null,
        loaded: false,
        ready: false,
        bans: List(),
        picks: List(),
      }),
      timer: -1,
      timerId: null,
      actionsTaken: List(),
      startTime: new FakeDate(),
    });

    const actualDraft = createActiveDraft('AAAAAA', validDraft);
    expect(actualDraft).toEqual(expectedDraft);
    global.Date = oldDate;
  });
});
