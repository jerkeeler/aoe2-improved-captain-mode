"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.randomInt = randomInt;
function randomEl(arr) {
    return arr[randomInt(0, arr.length)];
}
exports.randomEl = randomEl;
//# sourceMappingURL=random.js.map