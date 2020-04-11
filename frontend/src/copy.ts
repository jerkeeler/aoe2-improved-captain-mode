import { Action, ActionObject, ActionScope, ActionType, ActionVisibility, Captains } from '@icm/shared/types';

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

const scopeNameActiveCap = {
  [ActionScope.GLOBAL]: 'globally',
  [ActionScope.EXCLUSIVE]: 'for your opponent',
  [ActionScope.NONE]: '',
};

const scopeNameInActiveCap = {
  [ActionScope.GLOBAL]: 'globally',
  [ActionScope.EXCLUSIVE]: 'from you',
  [ActionScope.NONE]: '',
};

function getAdminActionCopy(action: Action) {
  return 'TODO';
}

function getActiveCaptainCopy(action: Action) {
  return `Please ${typeName[action.type].toUpperCase()} a ${objectName[action.object].toUpperCase()} ${
    scopeNameActiveCap[action.scope]
  }...`;
}

function getOtherCaptainCopy(action: Action) {
  return `Waiting for the other captain to ${typeName[action.type].toUpperCase()} a ${objectName[
    action.object
  ].toUpperCase()} ${scopeNameInActiveCap[action.scope]}...`;
}

export const getCaptainCopy = (action: Action, captainEnum: Captains) => {
  if (action.captain === Captains.ADMIN) return getAdminActionCopy(action);
  if (action.captain === captainEnum) return getActiveCaptainCopy(action);
  return getOtherCaptainCopy(action);
};
