import { Role } from './types';

export enum SocketEvent {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  DISCONNECT_MESSAGE = 'disconnectMessage',
  JOIN = 'join',
  READY = 'ready',
  YOU = 'you',
  DRAFT_INFO = 'draftInfo',
  COUNTDOWN = 'countdown',
  CLIENT_DRAFT_EVENT = 'clientDraftEvent',
  SERVER_DRAFT_EVENT = 'serverDraftEvent',
}

export interface JoinRoomMessage {
  draftToken: string;
  role: Role;
  name: string;
}
