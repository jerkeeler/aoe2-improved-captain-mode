const DRAFT_TYPES = {
  CIVS: 'C',
  CIVS_AND_MAPS: 'CM',
  MAPS: 'M',
};

const ACTION_OBJECT = {
  MAP: 'M',
  CIV: 'C',
};

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

const DRAFT_STATE = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
};

const ROLES = {
  SPECTATOR: 'spectator',
  CAPTAIN: 'captain',
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
  constructor(scope, object, type, visibility, captain) {
    this.scope = scope;
    this.object = object;
    this.type = type;
    this.visibility = visibility;
    this.captain = captain;
  }
}

class ActiveDraft {
  constructor(token, draftConfig) {
    this.state = DRAFT_STATE.WAITING;
    this.numSpectators = 0;
    this.token = token;
    this.draftConfig = draftConfig;
    this.currentActionIdx = -1;
    this.captain1 = {
      token: null,
      name: null,
      loaded: false,
      ready: false,
      bans: [],
      picks: [],
    };
    this.captain2 = {
      token: null,
      name: null,
      loaded: false,
      ready: false,
      bans: [],
      picks: [],
    };
    this.timer = -1;
    this.timerId = null;
    this.actionsTaken = [];
    this.startTime = new Date();
  }

  forFrontend = () => ({
    state: this.state,
    numSpectators: this.numSpectators,
    token: this.token,
    draftConfig: this.draftConfig,
    currentActionIdx: this.currentActionIdx,
    captain1: {
      name: this.captain1.name,
      loaded: this.captain1.loaded,
      ready: this.captain1.ready,
      bans: this.captain1.bans,
      picks: this.captain1.picks,
    },
    captain2: {
      name: this.captain2.name,
      loaded: this.captain2.loaded,
      ready: this.captain2.ready,
      bans: this.captain2.bans,
      picks: this.captain2.picks,
    },
  });
}

module.exports = {
  DRAFT_TYPES,
  ACTION_OBJECT,
  ACTION_TYPE,
  ACTION_SCOPE,
  ACTION_VISIBILITY,
  CAPTAINS,
  DRAFT_STATE,
  ROLES,
  Action,
  Draft,
  ActiveDraft,
};
