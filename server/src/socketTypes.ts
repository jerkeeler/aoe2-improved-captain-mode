import { Role } from '@icm/shared/types';

import SocketIO from 'socket.io';

export interface ConnectionInfo {
  draftToken?: string;
  captainToken?: string;
  name?: string;
  role?: Role;
}

export interface SocketInfo {
  socket: SocketIO.Socket;
  connInfo: ConnectionInfo;
  io: SocketIO.Server;
}
