import { Captains, ActionObject, ActionType, ActionScope, ActionVisibility } from '@icm/shared/types';

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
  [ActionScope.GLOBAL]: '',
  [ActionScope.EXCLUSIVE]: 'E',
  [ActionScope.NONE]: '',
};

export const visibilityName = {
  [ActionVisibility.VISIBLE]: 'V',
  [ActionVisibility.HIDDEN]: 'H',
};
