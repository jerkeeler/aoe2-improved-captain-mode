import {
  CAPTAINS,
  ACTION_OBJECT,
  ACTION_TYPE,
  ACTION_SCOPE,
  ACTION_VISIBILITY,
} from './models';

export const captainName = {
  [CAPTAINS.CAP_1]: 'Cap 1',
  [CAPTAINS.CAP_2]: 'Cap 2',
  [CAPTAINS.ADMIN]: 'Admin',
};

export const objectName = {
  [ACTION_OBJECT.MAP]: 'Map',
  [ACTION_OBJECT.CIV]: 'Civ',
  [ACTION_OBJECT.ALL]: 'All',
};

export const typeName = {
  [ACTION_TYPE.BAN]: 'Ban',
  [ACTION_TYPE.PICK]: 'Pick',
  [ACTION_TYPE.REVEAL]: 'Rev',
};

export const scopeName = {
  [ACTION_SCOPE.GLOBAL]: 'G',
  [ACTION_SCOPE.EXCLUSIVE]: 'E',
};

export const visibilityName = {
  [ACTION_VISIBILITY.VISIBLE]: 'V',
  [ACTION_VISIBILITY.HIDDEN]: 'H',
};

function getRevealName(action) {
  return `${typeName[action.type]} ${objectName[action.object]}`;
}

function getCapActionName(action) {
  return `${objectName[action.object]} ` +
    `${scopeName[action.scope]}${typeName[action.type]}`;
  // `${scopeName[action.scope]}${typeName[action.type]} ` +
    // `${visibilityName[action.visibility]}`;
}

export function getActionName(action) {
  if (action.type === ACTION_TYPE.REVEAL) {
    return getRevealName(action);
  }
  return getCapActionName(action);
}

