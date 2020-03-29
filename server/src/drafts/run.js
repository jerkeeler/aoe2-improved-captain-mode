// Handles all logic around actually running a draft
const { ROLES } = require('../models');
const { randomToken } = require('../random');
const logger = require('../logger');

const { canJoin, areCaptainsReady } = require('./storeRo');
const { joinSpectator, joinCaptain, readyCaptain } = require('./actions');

function joinRoom({ socket, connInfo}, { token, role, name }) {
  const joinResult = canJoin(token, role);
  if (!joinResult.result) {
    socket.emit('disconnectMessage', joinResult.reason);
    return;
  }

  switch (role) {
    case ROLES.SPECTATOR:
      joinSpectator(token);
      connInfo.draftToken = token;
      connInfo.role = ROLES.SPECTATOR;
      logger.info(`Spectator joined draft ${token}`);
      return;
    case ROLES.CAPTAIN:
      const captainToken = randomToken();
      joinCaptain(token, captainToken, name);
      connInfo.token = captainToken;
      connInfo.draftToken = token;
      connInfo.role = ROLES.CAPTAIN;
      logger.info(`Captain "${name}" (${captainToken}) joined draft ${token}`);
      return;
  }
}

function captainReady({ io, connInfo }) {
  if (!connInfo.draftToken || !connInfo.token)
    return;
  readyCaptain(connInfo.draftToken, connInfo.token);
  if (areCaptainsReady(connInfo.draftToken))
    io.in(connInfo.draftToken).emit('ready');
}

function startDraft() {

}

module.exports = {
  joinRoom,
  captainReady,
};
