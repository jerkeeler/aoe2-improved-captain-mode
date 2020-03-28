const store = require('../../src/drafts/store');
const { SameTokenError } = require('../../src/xceptions');

const validDraft = {
  name: 'test',
  actions: [
    {
      scope: 'G',
      type: 'P',
      visibility: 'V',
      captain: 1,
    }
  ],
  globalCivBans: [],
  mapPool: [],
};


describe('draft ephemeral storage', () => {
  beforeEach(() => {
    store.state = {};
  });

  test('create new draft', () => {
    const token = store.newDraft(validDraft);
    expect(token).not.toBeNull();
  });

  test('create draft with same token', () => {
    const oldRandom = global.Math.random;
    global.Math.random = () => 0.5;
    const token1 = store.newDraft(validDraft);
    expect(() => store.newDraft(validDraft)).toThrow(SameTokenError);
    global.Math.random = oldRandom;
  });
});
