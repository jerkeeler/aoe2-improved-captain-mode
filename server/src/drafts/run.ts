// Handles all logic around actually running a draft
import { ConnectionInfo, JoinRoomData, Role, SocketInfo } from '../models';
import { randomToken } from '../random';
import logger from '../logger';
import { canJoin, areCaptainsReady } from './storeRo';

import { joinSpectator, joinCaptain } from './actions';

export function joinRoom({ socket, connInfo }: SocketInfo, { token, role, name }: JoinRoomData) {
  const joinResult = canJoin(token, role);
  if (!joinResult.result) {
    socket.emit('disconnectMessage', joinResult.reason);
    return;
  }

  switch (role) {
    case Role.SPECTATOR:
      joinSpectator(token);
      connInfo.draftToken = token;
      connInfo.role = Role.SPECTATOR;
      logger.info(`Spectator joined draft ${token}`);
      break;
    case Role.CAPTAIN:
      const captainToken = randomToken();
      joinCaptain(token, captainToken, name);
      connInfo.token = captainToken;
      connInfo.draftToken = token;
      connInfo.role = Role.CAPTAIN;
      logger.info(`Captain "${name}" (${captainToken}) joined draft ${token}`);
      break;
    default:
      throw new Error('Role not valid for joining room!');
  }
  socket.join(token);
}

// function captainReady({ io, connInfo }) {
//   if (!connInfo.draftToken || !connInfo.token)
//     return;
//   readyCaptain(connInfo.draftToken, connInfo.token);
//   if (areCaptainsReady(connInfo.draftToken))
//     io.in(connInfo.draftToken).emit('ready');
// }

function startDraft() {

}
