import {
  ActionObject,
  ActionScope,
  ActionType,
  ActionVisibility,
  Captains,
  Civ,
  Map,
  Draft,
  Action,
} from '../models';
import { InvalidActionError, InvalidCivError, InvalidMapError } from '../xceptions';

const civs = require('../data/civilizations').civilizations as Civ[];
const maps = require('../data/maps').maps as Map[];

const civIds = new Set(civs.map(c => c.id));
const mapIds = new Set(maps.map(m => m.id));
const actionObjectSet = new Set(Object.values(ActionObject));
const actionScopeSet = new Set(Object.values(ActionScope));
const actionTypeSet = new Set(Object.values(ActionType));
const actionVisibilitySet = new Set(Object.values(ActionVisibility));


function compressedDataToJson(compressedData: string): Draft {
  const [name, rawActions, rawCivBans, rawMapPool] = compressedData.split('|');

  const actions = rawActions.split(',').map(a => a.split('')).map(([scope, object, action, visibility, player]) => ({
    scope: scope as ActionScope,
    object: object as ActionObject,
    type: action as ActionType,
    visibility: visibility as ActionVisibility,
    captain: Number(player) as Captains,
  }));
  const globalCivBans = (rawCivBans && rawCivBans.split(',').map(c => +c)) || [];
  const mapPool = (rawMapPool && rawMapPool.split(',').map(m => +m)) || [];

  return {
    name,
    actions,
    globalCivBans,
    mapPool,
  };
}

export function inflatePresets(presets: string[]) {
  const decompressedPresets = presets.map(d => compressedDataToJson(d));
  decompressedPresets.map(validateDraft);
  return decompressedPresets;
}

export function validateDraft(draft: Draft) {
  console.log(999999, draft);
  validateCivs(draft.globalCivBans);
  validateMaps(draft.mapPool);
  draft.actions.map(validateAction);
}

function validateCivs(civList: number[]) {
  civList.map(civId => {
    if (!civIds.has(civId))
      throw new InvalidCivError(civId);
  });
}

function validateMaps(mapList: number[]) {
  mapList.map(mapId => {
    if (!mapIds.has(mapId))
      throw new InvalidMapError(mapId);
  });
}

function validateAction(action: Action) {
  if (!actionTypeSet.has(action.type))
    throw new InvalidActionError(action);
  if (!actionScopeSet.has(action.scope))
    throw new InvalidActionError(action);
  if (!actionVisibilitySet.has(action.visibility))
    throw new InvalidActionError(action);
  if (!(action.captain in Captains))
    throw new InvalidActionError(action);
  if (!actionObjectSet.has(action.object))
    throw new InvalidActionError(action);
}
