import { Civ, Map } from '../src/models';

const civs = require('../data/civilizations').civilizations;
const maps = require('../data/maps').maps;
const names = require('../data/names').names;

test('civ ids are unique', () => {
  const ids = new Set(civs.map((c: Civ) => c.id));
  expect(ids.size).toEqual(civs.length);
});

test('map ids are unique', () => {
  const ids = new Set(maps.map((m: Map) => m.id));
  expect(ids.size).toEqual(maps.length);
});

test('names are unique', () => {
  const uniqueNames = new Set(names);
  expect(uniqueNames.size).toEqual(names.length);
});
