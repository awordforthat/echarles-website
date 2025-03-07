import { configureStore } from '@reduxjs/toolkit';
import solutionReducer from './solutionSlice';
import selectionReducer from './selectionSlice';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    solution: solutionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
