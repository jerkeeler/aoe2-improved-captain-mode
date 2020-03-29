import openSocket from 'socket.io-client';
let socket = null;

const joinRoom = (token, name, role) => {
  connect();
  socket.emit('join', { token, name, role });
};

const doAction = () => {
  socket.emit('action', {value: 'action values go here'});
};

const connect = () => {
  if (socket !== null) {
    console.error('Connection already open! Cannot open new connection!');
    socket.disconnect();
    socket = null;
  }
  socket = openSocket();
  socket.on('disconnect', () => socket = null);
};

export { socket, connect, doAction, joinRoom };
