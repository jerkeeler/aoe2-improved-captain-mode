import { safeClearState, createNewDraft } from '../actions';
import { SameTokenError } from '../../xceptions';

import { validDraft } from '../../../__tests__/fixtures';

describe('draft store actions', () => {
  afterAll(() => {
    safeClearState();
  });

  test('can create new draft', () => {
    const token = createNewDraft(validDraft);
    expect(token).not.toBeNull();
    expect(token.length).toEqual(6);
  });

  test('throws error when creating draft with same token', () => {
    const oldRandom = global.Math.random;
    global.Math.random = () => 1;
    createNewDraft(validDraft);
    expect(() => createNewDraft(validDraft)).toThrowError(SameTokenError);
    global.Math.random = oldRandom;
  });
});
