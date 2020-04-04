// Handles all logic around actually running a draft
import { Role } from '@icm/shared/types';
import { JoinRoomMessage, SocketEvent } from '@icm/shared/socketTypes';

import { SocketInfo } from '../socketTypes';
import { randomToken } from '../random';
import logger from '../logger';
import { canJoin, getFrontendDraftInfo, areCaptainsReady, getYouInfo } from './storeRo';

import { joinSpectator, joinCaptain, readyCaptain } from './actions';

export function joinRoom({ socket, connInfo, io }: SocketInfo, { draftToken, role, name }: JoinRoomMessage): void {
  const joinResult = canJoin(draftToken, role);
  if (!joinResult.result) {
    logger.info(`Attempted to join draft ${draftToken} but not allowed! role=${role}`);
    socket.emit(SocketEvent.DISCONNECT_MESSAGE, joinResult.reason);
    return;
  }

  let captainToken;
  switch (role) {
    case Role.SPECTATOR:
      joinSpectator(draftToken);
      connInfo.draftToken = draftToken;
      connInfo.role = Role.SPECTATOR;
      logger.info(`Spectator joined draft ${draftToken}`);
      break;
    case Role.CAPTAIN:
      captainToken = randomToken();
      joinCaptain(draftToken, captainToken, name);
      connInfo.captainToken = captainToken;
      connInfo.draftToken = draftToken;
      connInfo.role = Role.CAPTAIN;
      logger.info(`Captain "${name}" (${captainToken}) joined draft ${draftToken}`);
      break;
    default:
      throw new Error('Role not valid for joining room!');
  }
  socket.join(draftToken);
  socket.emit(SocketEvent.YOU, getYouInfo(draftToken, captainToken));
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));

  // TODO: If draft is already in progress re-emit all events
}

export function captainReady({ io, connInfo: { captainToken, draftToken } }: SocketInfo) {
  if (!draftToken || !captainToken) return;
  readyCaptain(draftToken, captainToken);
  logger.info(`Captain ${captainToken} has readied up for ${draftToken}`);
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));
  if (areCaptainsReady(draftToken)) {
    logger.info(`All captains are ready for draft ${draftToken}! Let the draft begin!`);
    // Begin countdown!
  }
}
