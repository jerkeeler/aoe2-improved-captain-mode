const { createStore, applyMiddleware, compose } = require('redux');
const thunkMiddleware = require('redux-thunk').default;

const reducer = require('./reducer');
const { loggerMiddleware } = require('./middleware');

const middleware = [loggerMiddleware, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middleware);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(reducer, undefined, composedEnhancers);

module.exports = { store, dispatch: store.dispatch };
