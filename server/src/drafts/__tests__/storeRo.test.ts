import { Role } from '@icm/shared/types';

import { safeClearState, createNewDraft, joinCaptain } from '../actions';
import { canJoin, draftExists } from '../storeRo';

import { validDraft } from '../../../__tests__/fixtures';

describe('draft store RO API', () => {
  let draftToken: string;

  beforeEach(() => {
    draftToken = createNewDraft(validDraft);
  });

  afterEach(() => {
    safeClearState();
  });

  test('can join true', () => {
    expect(canJoin(draftToken, Role.CAPTAIN_1).result).toBe(true);
  });

  test('can join false', () => {
    joinCaptain(draftToken, 'A', 'C1', Role.CAPTAIN_1);
    joinCaptain(draftToken, 'B', 'C2', Role.CAPTAIN_2);
    expect(canJoin(draftToken, Role.CAPTAIN_1).result).toBe(false);
  });

  test('draft exists true', () => {
    expect(draftExists(draftToken)).toBe(true);
  });

  test('draft exists false', () => {
    expect(draftExists('?')).toBe(false);
  });
});
