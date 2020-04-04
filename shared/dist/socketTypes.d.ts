import { Role } from './types';
export declare enum SocketEvent {
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    DISCONNECT_MESSAGE = "disconnectMessage",
    JOIN = "join",
    READY = "ready",
    YOU = "you",
    DRAFT_INFO = "draftInfo"
}
export interface JoinRoomMessage {
    draftToken: string;
    role: Role;
    name: string;
}
