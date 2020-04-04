import { server } from './server';
import startIo, { Socket } from 'socket.io';
const io = startIo(server);

import { JoinRoomMessage, SocketEvent } from '@icm/shared/socketTypes';
import logger from './logger';
import * as draftLogic from './drafts/run';
import { ConnectionInfo, SocketInfo } from './socketTypes';

io.on(SocketEvent.CONNECTION, (socket: Socket) => {
  const connInfo: ConnectionInfo = {};
  const socketInfo: SocketInfo = {
    socket,
    connInfo,
    io,
  };
  logger.debug('a user connected!');

  socket.on(SocketEvent.JOIN, (data: JoinRoomMessage) => draftLogic.joinRoom(socketInfo, data));
  socket.on(SocketEvent.READY, () => draftLogic.captainReady(socketInfo));

  socket.on(SocketEvent.DISCONNECT, function () {
    // TODO clean up code:
    // - If active and captain pause the draft and wait for reconnect
    // - If spectator decrement spec count and emit draft info
    console.log(1111111, connInfo);
    console.log('user disconnected');
  });
});

module.exports = io;
