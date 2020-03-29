const { Map, List } = require('immutable');

const { DRAFT_STATE } = require('../models');

function createActiveDraft(token, draftConfig) {
  return Map({
    state: DRAFT_STATE.WAITING,
    numSpectators: 0,
    token: token,
    draftConfig: draftConfig,
    currentActionIdx: -1,
    captain1: createCaptain(),
    captain2: createCaptain(),
    timer: -1,
    timerId: null,
    actionsTaken: List(),
    startTime: new Date(),
  });
}

function createCaptain() {
  return Map({
    token: null,
    name: null,
    loaded: false,
    ready: false,
    bans: List(),
    picks: List(),
  });
}

module.exports = {
  createActiveDraft
};
