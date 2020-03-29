// Handles all logic around actually running a draft
const { ROLES } = require('../models');
const { randomToken } = require('../random');
const logger = require('../logger');
const store = require('./store');

function joinRoom(socket, connInfo, { token, role, name }) {
  const canJoin = store.canJoin(token, role);
  if (!canJoin.result) {
    socket.emit('disconnectMessage', canJoin.reason);
    socket.disconnect();
    return;
  }

  switch (role) {
    case ROLES.SPECTATOR:
      store.joinSpec(token);
      connInfo.draftToken = token;
      connInfo.role = ROLES.SPECTATOR;
      logger.info(`Spectator joined draft ${token}`);
      return;
    case ROLES.CAPTAIN:
      const captainToken = randomToken();
      store.joinCaptain(token, captainToken, name);
      connInfo.token = captainToken;
      connInfo.draftToken = token;
      connInfo.role = ROLES.CAPTAIN;
      logger.info(`Captain "${name}" (${captainToken}) joined draft ${token}`);
      return;
  }

}

module.exports = {
  joinRoom,
};
