export interface Civ {
    id: number;
    name: string;
    uniqueUnit: string;
}
export interface Map {
    id: number;
    name: string;
    img: string;
}
export interface Action {
    scope: ActionScope;
    object: ActionObject;
    type: ActionType;
    visibility: ActionVisibility;
    captain: Captains;
}
export interface Draft {
    name: string;
    actions: Action[];
    globalCivBans: number[];
    mapPool: number[];
}
export declare enum Captains {
    CAP_1 = 1,
    CAP_2 = 2,
    ADMIN = 3
}
export declare enum ActionObject {
    MAP = "M",
    CIV = "C",
    ALL = "A",
    BAN = "B"
}
export declare enum ActionType {
    BAN = "B",
    PICK = "P",
    REVEAL = "R"
}
export declare enum ActionScope {
    GLOBAL = "G",
    EXCLUSIVE = "E",
    NONE = "_"
}
export declare enum ActionVisibility {
    HIDDEN = "H",
    VISIBLE = "V",
    NONE = "_"
}
export declare enum Role {
    SPECTATOR = "spectator",
    CAPTAIN_1 = "captain1",
    CAPTAIN_2 = "captain2"
}
export declare enum DraftState {
    WAITING = 0,
    IN_PROGRESS = 1,
    FINISHED = 2
}
export interface CaptainInfo {
    name?: string;
    loaded: boolean;
    ready: boolean;
}
export interface DraftInfo {
    state: DraftState;
    numSpectators: number;
    token: string;
    currentActionIdx: number;
    captain1: CaptainInfo;
    captain2: CaptainInfo;
}
export interface ServerDraftEvent extends Action {
    civBans: number[];
    civPicks: number[];
    mapBans: number[];
    mapPicks: number[];
}
export interface ClientDraftEvent extends Action {
    value: number;
}
