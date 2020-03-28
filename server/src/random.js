const { TOKEN_CHARS, TOKEN_LENGTH } = require('./consts');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomEl(arr) {
  return arr[randomInt(0, arr.length)];
}

function randomToken(tokenLength = TOKEN_LENGTH) {
  return Array(tokenLength).fill(0).map(() => randomEl(TOKEN_CHARS)).join('');
}

module.exports = {
  randomEl,
  randomInt,
  randomToken,
};
