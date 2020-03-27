export const ACTION_TYPE = {
  BAN: 'B',
  PICK: 'P',
  REVEAL: 'R',
};

export const ACTION_SCOPE = {
  GLOBAL: 'G', // Prevents all captains from choosing the same choice
  EXCLUSIVE: 'E',  // Prevents only the captain that chose from choosing the same thing
  PICKS: 'P',
  BANS: 'B',
  ALL: 'A',
};

export const ACTION_VISIBILITY = {
  HIDDEN: 'H',
  VISIBLE: 'V',
  NONE: 'N',
};

export const CAPTAINS = {
  CAP_1: 1,
  CAP_2: 2,
  ADMIN: 3,
};


export class Draft {
  constructor(name, actions, globalCivBans, mapPool) {
    this.name = name;
    this.actions = actions;
    this.globalCivBans = globalCivBans;
    this.mapPool = mapPool;
  }
}

export class Action {
  constructor(scope, type, visibility, captain) {
    this.scope = scope;
    this.type = type;
    this.visibility = visibility;
    this.captain = captain;
  }
}

export function loadDraft(draftJson) {
  const actions = draftJson.actions.map(a => new Action(a.scope, a.type, a.visibility, a.captain));
  return new Draft(draftJson.name, actions, draftJson.globalCivBans, draftJson.mapPool);
}
