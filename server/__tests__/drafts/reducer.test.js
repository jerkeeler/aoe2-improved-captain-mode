const { Map } = require('immutable');

const ACTIONS = require('../../src/drafts/actionTypes');
const reducer = require('../../src/drafts/reducer');

describe('draft store reducer', () => {
  test('default state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(Map());
  });

  test('clear state', () => {
    const state = reducer({'stuff here': 1111}, {type: ACTIONS.CLEAR_STATE});
    expect(state).toEqual(Map());
  });

  test('new draft', () => {
    const state = reducer(undefined, {
      type: ACTIONS.NEW_DRAFT,
      token: 'AA',
      draft: 'POOP',
    });
    const expectedState = Map({'AA': 'POOP'});
    expect(state).toEqual(expectedState);
  });

  test('join captain', () => {
    const state = reducer(undefined, {
      type: ACTIONS.JOIN_CAPTAIN,
      token: 'AA',
      captainToken: 'CC',
      name: 'Potato',
    });
    const expectedState = Map({
      AA: Map({
        captain1: Map({
          loaded: true,
          token: 'CC',
          name: 'Potato',
        }),
      }),
    });
    expect(state).toEqual(expectedState);
  });
});
