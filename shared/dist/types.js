"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Captains;
(function (Captains) {
    Captains[Captains["CAP_1"] = 1] = "CAP_1";
    Captains[Captains["CAP_2"] = 2] = "CAP_2";
    Captains[Captains["ADMIN"] = 3] = "ADMIN";
})(Captains = exports.Captains || (exports.Captains = {}));
var ActionObject;
(function (ActionObject) {
    ActionObject["MAP"] = "M";
    ActionObject["CIV"] = "C";
    ActionObject["ALL"] = "A";
    ActionObject["BAN"] = "B";
})(ActionObject = exports.ActionObject || (exports.ActionObject = {}));
var ActionType;
(function (ActionType) {
    ActionType["BAN"] = "B";
    ActionType["PICK"] = "P";
    ActionType["REVEAL"] = "R";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var ActionScope;
(function (ActionScope) {
    ActionScope["GLOBAL"] = "G";
    ActionScope["EXCLUSIVE"] = "E";
    ActionScope["NONE"] = "_";
})(ActionScope = exports.ActionScope || (exports.ActionScope = {}));
var ActionVisibility;
(function (ActionVisibility) {
    ActionVisibility["HIDDEN"] = "H";
    ActionVisibility["VISIBLE"] = "V";
    ActionVisibility["NONE"] = "_";
})(ActionVisibility = exports.ActionVisibility || (exports.ActionVisibility = {}));
var Role;
(function (Role) {
    Role["SPECTATOR"] = "spectator";
    Role["CAPTAIN_1"] = "captain1";
    Role["CAPTAIN_2"] = "captain2";
})(Role = exports.Role || (exports.Role = {}));
var DraftState;
(function (DraftState) {
    DraftState[DraftState["WAITING"] = 0] = "WAITING";
    DraftState[DraftState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    DraftState[DraftState["FINISHED"] = 2] = "FINISHED";
})(DraftState = exports.DraftState || (exports.DraftState = {}));
//# sourceMappingURL=types.js.map