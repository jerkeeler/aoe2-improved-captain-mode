const logger = require('../logger');

const loggerMiddleware = store => next => action => {
  logger.debug('dispatching: %s', action.type);
  const result = next(action);
  const state = store.getState();
  logger.debug('next state: %o', state.toJS());
  return result;
};

module.exports = {
  loggerMiddleware,
};
