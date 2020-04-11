// Handles all logic around actually running a draft
import { ActionType, ClientDraftEvent, DraftState, Role, ServerDraftEvent } from '@icm/shared/types';
import { JoinRoomMessage, SocketEvent } from '@icm/shared/socketTypes';
import { duration, utc } from 'moment';
import SocketIO from 'socket.io';

import { SocketInfo } from '../socketTypes';
import { randomToken } from '../random';
import logger from '../logger';
import { areCaptainsReady, canJoin, doActionsRemain, getDraftState, getFrontendDraftInfo } from './storeRo';
import {
  incrementActionIdx,
  joinCaptain,
  joinSpectator,
  leaveCaptain,
  leaveSpectator,
  readyCaptain,
  setDraftState,
} from './actions';
import { READY_WAIT_SECONDS, TURN_LENGTH_SECONDS } from './draftConsts';
import Timeout = NodeJS.Timeout;

interface Countdowns {
  [key: string]: Timeout | null;
}
const countdowns: Countdowns = {};

function countdown(io: SocketIO.Server, draftToken: string, funcToRun: () => void, length: number) {
  logger.debug(`Starting countdown for draft ${draftToken} for ${length} seconds`);
  const lengthMilliseconds = length * 1000;
  const startTime = utc();
  const timeout = () => {
    const timeSoFar = duration(utc().diff(startTime));
    const remaining = lengthMilliseconds - timeSoFar.asMilliseconds();
    logger.debug(`${remaining} milliseconds remaining for draft ${draftToken} countdown`);
    if (remaining <= 0) {
      io.in(draftToken).emit(SocketEvent.COUNTDOWN, 0);
      funcToRun();
      countdowns[draftToken] = null;
      logger.debug(`Countdown finished for draft ${draftToken}!`);
      return;
    }

    const remainingSeconds = length - timeSoFar.asSeconds();
    io.in(draftToken).emit(SocketEvent.COUNTDOWN, remainingSeconds);
    countdowns[draftToken] = setTimeout(timeout, 1000);
  };
  io.in(draftToken).emit(SocketEvent.COUNTDOWN, length);
  logger.debug(`Should be ${length}`);
  countdowns[draftToken] = setTimeout(timeout, 1000);
}

function cancelCountdown(draftToken: string) {
  if (!countdowns[draftToken]) return;
  const countdown = countdowns[draftToken];
  if (countdown === null) return;
  clearInterval(countdown);
}

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
    case Role.CAPTAIN_1:
    case Role.CAPTAIN_2:
      captainToken = randomToken();
      joinCaptain(draftToken, captainToken, name, role);
      connInfo.captainToken = captainToken;
      connInfo.draftToken = draftToken;
      connInfo.role = role;
      logger.info(`Captain "${name}" (${captainToken}) joined draft ${draftToken}`);
      break;
    default:
      throw new Error('Role not valid for joining room!');
  }
  socket.join(draftToken);
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));

  // TODO: If draft is already in progress re-emit all events
}

function completeDraft(io: SocketIO.Server, draftToken: string) {
  setDraftState(draftToken, DraftState.FINISHED);
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));
  logger.info(`Draft ${draftToken} has completed!`);
}

function nextAction(io: SocketIO.Server, draftToken: string) {
  if (!doActionsRemain(draftToken)) return completeDraft(io, draftToken);

  incrementActionIdx(draftToken);
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));

  cancelCountdown(draftToken);
  countdown(io, draftToken, () => nextAction(io, draftToken), TURN_LENGTH_SECONDS);
}

export function captainReady({ io, connInfo: { captainToken, draftToken } }: SocketInfo) {
  if (!draftToken || !captainToken) return;
  readyCaptain(draftToken, captainToken);
  logger.info(`Captain ${captainToken} has readied up for ${draftToken}`);
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));
  if (areCaptainsReady(draftToken)) {
    logger.info(`All captains are ready for draft ${draftToken}! Let the draft begin!`);
    const secs = getDraftState(draftToken) === DraftState.IN_PROGRESS ? TURN_LENGTH_SECONDS : READY_WAIT_SECONDS;
    setDraftState(draftToken, DraftState.IN_PROGRESS);
    countdown(io, draftToken, () => nextAction(io, draftToken), secs);
  }
}

export function leaveDraft({ io, connInfo: { draftToken, role } }: SocketInfo) {
  // TODO clean up code:
  // - If active and captain pause the draft and wait for reconnect
  if (!draftToken) return;
  if (role === Role.SPECTATOR) leaveSpectator(draftToken);
  if (role === Role.CAPTAIN_1 || role === Role.CAPTAIN_2) {
    cancelCountdown(draftToken);
    leaveCaptain(draftToken, role);
  }
  io.in(draftToken).emit(SocketEvent.DRAFT_INFO, getFrontendDraftInfo(draftToken));
}

export function draftEvent({ io, connInfo: { draftToken, role } }: SocketInfo, clientDraftEvent: ClientDraftEvent) {
  if (!draftToken || role === Role.SPECTATOR) return;

  // TODO: Check if it's that captains turn and corresponding action matches current action
  //  Validations
  const serverEvent: ServerDraftEvent = {
    scope: clientDraftEvent.scope,
    object: clientDraftEvent.object,
    type: clientDraftEvent.type,
    visibility: clientDraftEvent.visibility,
    captain: clientDraftEvent.captain,
    civBans: clientDraftEvent.type === ActionType.BAN ? [clientDraftEvent.value] : [],
    civPicks: clientDraftEvent.type === ActionType.PICK ? [clientDraftEvent.value] : [],
    mapBans: [],
    mapPicks: [],
  };
  io.in(draftToken).emit(SocketEvent.SERVER_DRAFT_EVENT, serverEvent);
  cancelCountdown(draftToken);
  nextAction(io, draftToken);
}
