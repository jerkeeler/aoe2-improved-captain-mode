import { safeClearState, createNewDraft, joinCaptain } from '../../src/drafts/actions';
import { Role } from '../../src/models';
import { canJoin, draftExists } from '../../src/drafts/storeRo';

const validDraft = require('../fixtures').validDraft;

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

  test('can join false', ()  => {
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

