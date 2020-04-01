import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import draftsReducer from './draftSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    drafts: draftsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
