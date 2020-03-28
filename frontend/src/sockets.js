import openSocket from 'socket.io-client';
const socket = openSocket();

const joinRoom = (token) => {
  socket.emit('join', {draftToken: token});
};

export { joinRoom };
