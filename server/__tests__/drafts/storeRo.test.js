const { clearState, createNewDraft, joinCaptain } = require('../../src/drafts/actions');
const { ROLES } = require('../../src/models');
const { canJoin, draftExists } = require('../../src/drafts/storeRo');

const validDraft = require('../fixtures').validDraft;

describe('draft store RO API', () => {
  let draftToken;

  beforeEach(() => {
    draftToken = createNewDraft(validDraft);
  });

  afterEach(() => {
    clearState();
  });

  test('can join true', () => {
    expect(canJoin(draftToken, ROLES.CAPTAIN).result).toBe(true);
  });

  test('can join false', ()  => {
    joinCaptain(draftToken, 'A', 'C1');
    joinCaptain(draftToken, 'B', 'C2');
    expect(canJoin(draftToken, ROLES.CAPTAIN).result).toBe(false);
  });

  test('draft exists true', () => {
    expect(draftExists(draftToken)).toBe(true);
  });

  test('draft exists false', () => {
    expect(draftExists('?')).toBe(false);
  });
});

