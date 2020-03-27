const civs = require('./data/civilizations').civilizations;
const maps = require('./data/maps').maps;
const { ACTION_SCOPE, ACTION_TYPE, ACTION_VISIBILITY, CAPTAINS, Action, Draft } = require('./models');
const { InvalidActionError, InvalidCivError, InvalidMapError } = require('./xceptions');

const civIds = new Set(civs.map(c => c.id));
const mapIds = new Set(maps.map(m => m.id));
const actionScopeValues = new Set(Object.values(ACTION_SCOPE));
const actionTypeValues = new Set(Object.values(ACTION_TYPE));
const actionVisibilityValues = new Set(Object.values(ACTION_VISIBILITY));
const captainValues = new Set(Object.values(CAPTAINS));


function compressedDataToJson(compressedData) {
  const [name, rawActions, rawCivBans, rawMapPool] = compressedData.split('|');
  const actions = rawActions.split(',').map(a => a.split('')).map(([scope, action, visibility, player]) =>
    new Action(scope, action, visibility, +player)
  );
  const globalCivBans = (rawCivBans && rawCivBans.split(',').map(c => +c)) || [];
  const mapPool = (rawMapPool && rawMapPool.split(',').map(m => +m)) || [];

  return new Draft(name, actions, globalCivBans, mapPool);
}

function inflatePresets(presets) {
  const decompressedPresets = presets.map(d => compressedDataToJson(d));
  decompressedPresets.map(validateDraft);
  return decompressedPresets;
}

function validateDraft(draft) {
  validateCivs(draft.globalCivBans);
  validateMaps(draft.mapPool);
  draft.actions.map(validateAction);
}

function validateCivs(civList) {
  civList.map(civId => {
    if (!civIds.has(civId))
      throw new InvalidCivError(civId);
  });
}

function validateMaps(mapList) {
  mapList.map(mapId => {
    if (!mapIds.has(mapId))
      throw new InvalidMapError(mapId);
  });
}

function validateAction(action) {
  if (!actionTypeValues.has(action.type))
    throw new InvalidActionError(action);
  if (!actionScopeValues.has(action.scope))
    throw new InvalidActionError(action);
  if (!actionVisibilityValues.has(action.visibility))
    throw new InvalidActionError(action);
  if (!captainValues.has(action.captain))
    throw new InvalidActionError(action);
}

module.exports = {
  inflatePresets,
  validateDraft,
};
