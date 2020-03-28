const { ACTION_SCOPE, ACTION_VISIBILITY, ACTION_TYPE, CAPTAINS, Draft, Action } = require('../../src/models');
const { inflatePresets, validateDraft, loadDraft } = require('../../src/drafts/config');
const presets = require('../../src/data/drafts').presets;
const { InvalidActionError } = require('../../src/xceptions');

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

const invalidDraft = {
  name: 'test',
  actions: [
    {
      scope: 'XXXXXXXX',
      type: 'P',
      visibility: 'V',
      captain: 1,
    }
  ],
  globalCivBans: [],
  mapPool: [],
};

describe('draft configuration', ()  => {
  test('inflatePresets', () => {
    const inflatedPresets = inflatePresets(presets);
    expect(inflatedPresets.length).toBeGreaterThan(0);

    const expectedFirstPreset = new Draft(
      '1 v 1',
      [
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_1
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_2
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_2
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_1
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_2
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.BAN,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_1
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.PICK,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_1
        ),
        new Action(
          ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.PICK,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_2,
        ),
      ],
      [],
      [],
    );

    expect(inflatedPresets[0]).toEqual(expectedFirstPreset);
  });

  test('validateDraft valid', () => {
    expect(() => validateDraft(validDraft)).not.toThrow();
  });

  test('validateDraft invalid', ()  => {
    expect(() => validateDraft(invalidDraft).toThrow(InvalidActionError));
  });

  test('load draft', () => {
    const loadedDraft = loadDraft(validDraft);

    const expectedDraft = new Draft(
      'test',
      [
        new Action(ACTION_SCOPE.GLOBAL,
          ACTION_TYPE.PICK,
          ACTION_VISIBILITY.VISIBLE,
          CAPTAINS.CAP_1,
        )
      ],
      [],
      []
    );

    expect(loadedDraft).toEqual(expectedDraft);
  });

});
