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
    draftLogic.leaveDraft(socketInfo);
    console.log('user disconnected');
  });
});

module.exports = io;
