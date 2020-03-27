const ACTION_TYPE = {
  BAN: 'B',
  PICK: 'P',
  REVEAL: 'R',
};

const ACTION_SCOPE = {
  GLOBAL: 'G', // Prevents all captains from choosing the same choice
  EXCLUSIVE: 'E',  // Prevents only the captain that chose from choosing the same thing
  PICKS: 'P',
  BANS: 'B',
  ALL: 'A',
};

const ACTION_VISIBILITY = {
  HIDDEN: 'H',
  VISIBLE: 'V',
  NONE: 'N',
};

const CAPTAINS = {
  CAP_1: 1,
  CAP_2: 2,
  ADMIN: 3,
};


class Draft {
  constructor(name, actions, globalCivBans, mapPool) {
    this.name = name;
    this.actions = actions;
    this.globalCivBans = globalCivBans;
    this.mapPool = mapPool;
  }
}

class Action {
  constructor(scope, type, visibility, captain) {
    this.scope = scope;
    this.type = type;
    this.visibility = visibility;
    this.captain = captain;
  }
}

module.exports = {
  ACTION_TYPE,
  ACTION_SCOPE,
  ACTION_VISIBILITY,
  CAPTAINS,
  Action,
  Draft,
};
