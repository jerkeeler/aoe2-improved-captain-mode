import { Captains, ActionObject, ActionType, ActionScope, ActionVisibility, Action } from './types';

export const captainName = {
  [Captains.CAP_1]: 'Cap 1',
  [Captains.CAP_2]: 'Cap 2',
  [Captains.ADMIN]: 'Admin',
};

export const objectName = {
  [ActionObject.MAP]: 'Map',
  [ActionObject.CIV]: 'Civ',
  [ActionObject.ALL]: 'All',
  [ActionObject.BAN]: 'Ban',
};

export const typeName = {
  [ActionType.BAN]: 'Ban',
  [ActionType.PICK]: 'Pick',
  [ActionType.REVEAL]: 'Rev',
};

export const scopeName = {
  [ActionScope.GLOBAL]: 'G',
  [ActionScope.EXCLUSIVE]: 'E',
  [ActionScope.NONE]: '',
};

export const visibilityName = {
  [ActionVisibility.VISIBLE]: 'V',
  [ActionVisibility.HIDDEN]: 'H',
};

function getRevealName(action: Action) {
  return `${typeName[action.type]} ${objectName[action.object]}`;
}

function getCapActionName(action: Action) {
  return `${objectName[action.object]} ${scopeName[action.scope]}${typeName[action.type]}`;
  // `${scopeName[action.scope]}${typeName[action.type]} ` +
  // `${visibilityName[action.visibility]}`;
}

export function getActionName(action: Action) {
  if (action.type === ActionType.REVEAL) {
    return getRevealName(action);
  }
  return getCapActionName(action);
}
