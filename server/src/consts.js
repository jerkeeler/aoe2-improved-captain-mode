const IS_PROD = process.env.ENV === 'prod';
const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const MAX_LOG_SIZE = 5242800; // 5MB
const MAX_LOG_FILES = 5;
const TOKEN_LENGTH = 6;
const UPPERCASE_CHARS = Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65));
const LOWERCASE_CHARS = UPPERCASE_CHARS.map(val => val.toLowerCase());
const TOKEN_CHARS = UPPERCASE_CHARS.concat(LOWERCASE_CHARS);
const MORGAN_FORMAT = ':method :url :status :res[content-length] - :response-time ms';

module.exports = {
  IS_PROD,
  LOG_LEVEL,
  MAX_LOG_SIZE,
  MAX_LOG_FILES,
  UPPERCASE_CHARS,
  LOWERCASE_CHARS,
  TOKEN_LENGTH,
  TOKEN_CHARS,
  MORGAN_FORMAT,
};
