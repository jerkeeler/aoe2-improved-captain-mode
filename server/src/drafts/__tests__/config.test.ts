import { ActionObject, ActionScope, ActionType, ActionVisibility, Captains, Draft } from '../../models';
import { inflatePresets, validateDraft } from '../config';
import { InvalidActionError } from '../../xceptions';

import { validDraft, invalidDraft } from '../../../__tests__/fixtures';

const presets = require('../../../data/drafts').presets;

describe('draft configuration', () => {
  test('inflatePresets', () => {
    const inflatedPresets = inflatePresets(presets);
    expect(inflatedPresets.length).toBeGreaterThan(0);
    const expectedFirstPreset: Draft = {
      name: '1 v 1',
      actions: [
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_1,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_2,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_2,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_1,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_2,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.BAN,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_1,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.PICK,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_2,
        },
        {
          scope: ActionScope.GLOBAL,
          object: ActionObject.CIV,
          type: ActionType.PICK,
          visibility: ActionVisibility.VISIBLE,
          captain: Captains.CAP_1,
        },
      ],
      globalCivBans: [],
      mapPool: [],
    };

    expect(inflatedPresets[0]).toEqual(expectedFirstPreset);
  });

  test('validateDraft valid', () => {
    expect(() => validateDraft(validDraft)).not.toThrow();
  });

  test('validateDraft invalid', () => {
    expect(() => validateDraft(invalidDraft)).toThrow(InvalidActionError);
  });
});
