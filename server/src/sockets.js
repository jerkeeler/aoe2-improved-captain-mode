const server = require('./server');
const io = require('socket.io')(server);
const logger = require('./logger');
const draftLogic = require('./drafts/run');

io.on('connection', (socket) => {
  let connInfo = {};
  const socketInfo = {
    socket,
    connInfo,
    io,
  };
  logger.debug('a user connected!');

  socket.on('join', (data) => draftLogic.joinRoom(socketInfo, data));
  socket.on('ready', () => draftLogic.captainReady(socketInfo));

  socket.on('disconnect', function() {
    // Do clean up code:
    // - If active and captain disconnect everyone
    // - If spectator decrement spec count and emit
    console.log(1111111, connInfo);
    console.log('user disconnected');
  });
});

module.exports = io;
