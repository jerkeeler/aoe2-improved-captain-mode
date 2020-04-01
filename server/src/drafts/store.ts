import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loggerMiddleware } from './middleware';

import draftReducer from './draftSlice';

export const store = configureStore({
  reducer: {
    drafts: draftReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    loggerMiddleware,
  ],
});
export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
