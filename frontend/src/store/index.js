import { createStore, applyMiddleware, combineReducers, compose, } from 'redux';
import thunkMiddleware from 'redux-thunk';

import defaultReducer from './reducer';
import crashMiddleware from './middleware/crash';


const middleware = [crashMiddleware, thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middleware);

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhancers(middlewareEnhancer);

const rootReducer = combineReducers({
  defaultReducer,
});

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;
