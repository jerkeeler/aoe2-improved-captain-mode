import { createLogger, transports, format } from 'winston';

import { IS_PROD, LOG_LEVEL, MAX_LOG_FILES, MAX_LOG_SIZE } from './consts';

const { colorize, combine, timestamp, prettyPrint, simple, splat } = format;

const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(splat(), timestamp(), prettyPrint()),
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'warn',
      handleExceptions: true,
      maxsize: MAX_LOG_SIZE,
      maxFiles: MAX_LOG_FILES,
    }),
  ],
});

if (IS_PROD) {
  logger.add(
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      maxsize: MAX_LOG_SIZE,
      maxFiles: MAX_LOG_FILES,
    }),
  );
}

if (!IS_PROD) {
  logger.add(
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: combine(colorize(), simple()),
    }),
  );
}

export default logger;
