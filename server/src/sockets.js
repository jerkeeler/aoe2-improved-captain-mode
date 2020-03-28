const server = require('./server');
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected!');
  socket.on('join', function(data) {
    console.log('user wants to join a room!');
    console.log(data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

module.exports = io;
