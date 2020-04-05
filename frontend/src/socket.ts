import openSocket from 'socket.io-client';

let socket: SocketIOClient.Socket | undefined;

export const connectSocket = () => {
  if (socket !== undefined) throw new Error('Cannot open a socket when one is already open!');
  socket = openSocket();
  return socket;
};

export const disconnectSocket = () => {
  if (socket === undefined) return;
  socket.disconnect();
  socket = undefined;
};

export const getSocket = (): SocketIOClient.Socket => {
  if (socket === undefined) return connectSocket();
  return socket;
};
