export const IS_PROD = process.env.ENV === 'prod';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const MAX_LOG_SIZE = 5242800; // 5MB
export const MAX_LOG_FILES = 5;
export const TOKEN_LENGTH = 6;
export const UPPERCASE_CHARS = Array(26)
  .fill(0)
  .map((_, i) => String.fromCharCode(i + 65));
export const LOWERCASE_CHARS = UPPERCASE_CHARS.map((val) => val.toLowerCase());
export const TOKEN_CHARS = UPPERCASE_CHARS.concat(LOWERCASE_CHARS);
export const MORGAN_FORMAT = ':method :url :status :res[content-length] - :response-time ms';
