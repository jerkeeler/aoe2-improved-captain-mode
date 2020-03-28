const civs = require('../src/data/civilizations').civilizations;
const maps = require('../src/data/maps').maps;
const names = require('../src/data/names').names;

test('civ ids are unique', () => {
  const ids = new Set(civs.map(c => c.id));
  expect(ids.size).toEqual(civs.length);
});

test('map ids are unique', () => {
  const ids = new Set(maps.map(m => m.id));
  expect(ids.size).toEqual(maps.length);
});

test('names are unique', () => {
  const uniqueNames = new Set(names);
  expect(uniqueNames.size).toEqual(names.length);
});
