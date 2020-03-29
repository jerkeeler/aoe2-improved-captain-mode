const { createLogger, transports, format } = require('winston');

const { IS_PROD, LOG_LEVEL, MAX_LOG_FILES, MAX_LOG_SIZE } = require('./consts');

const { colorize, combine, timestamp, prettyPrint, simple, splat } = format;

const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(
    splat(),
    timestamp(),
    prettyPrint(),
  ),
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

logger.morganStream = {
  write: message => logger.info(message),
};

if (IS_PROD) {
  logger.add(new transports.File({
    filename: './logs/info.log',
    level: 'info',
    maxsize: MAX_LOG_SIZE,
    maxFiles: MAX_LOG_FILES,
  }));
}

if (!IS_PROD) {
  logger.add(new transports.Console({
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    format: combine(colorize(), simple()),
  }));
}

module.exports = logger;
