import { safeClearState, createNewDraft, joinCaptain } from '../actions';
import { Role } from '../../models';
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
    expect(canJoin(draftToken, Role.CAPTAIN).result).toBe(true);
  });

  test('can join false', () => {
    joinCaptain(draftToken, 'A', 'C1');
    joinCaptain(draftToken, 'B', 'C2');
    expect(canJoin(draftToken, Role.CAPTAIN).result).toBe(false);
  });

  test('draft exists true', () => {
    expect(draftExists(draftToken)).toBe(true);
  });

  test('draft exists false', () => {
    expect(draftExists('?')).toBe(false);
  });
});
