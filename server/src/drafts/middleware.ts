import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux';

import logger from '../logger';

export const loggerMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  logger.debug('dispatching: %s', action.type);
  const result = next(action);
  const state = api.getState();
  logger.debug('next state: %o', state);
  return result;
};
