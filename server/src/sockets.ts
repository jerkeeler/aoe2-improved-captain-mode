import { server } from './server';
import startIo, { Socket } from 'socket.io';
const io = startIo(server);

import logger from './logger';
import { joinRoom } from './drafts/run';
import { ConnectionInfo, JoinRoomData, SocketInfo } from './models';

io.on('connection', (socket: Socket) => {
  let connInfo: ConnectionInfo = {};
  const socketInfo: SocketInfo = {
    socket,
    connInfo,
    io,
  };
  logger.debug('a user connected!');

  socket.on('join', (data: JoinRoomData) => joinRoom(socketInfo, data));
  // socket.on('ready', () => draftLogic.captainReady(socketInfo));

  socket.on('disconnect', function() {
    // Do clean up code:
    // - If active and captain disconnect everyone
    // - If spectator decrement spec count and emit
    console.log(1111111, connInfo);
    console.log('user disconnected');
  });
});

module.exports = io;
