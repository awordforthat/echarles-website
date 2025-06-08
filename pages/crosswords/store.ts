import { configureStore } from '@reduxjs/toolkit';
import solutionReducer from './solutionSlice';
import selectionReducer from './selectionSlice';
import inputReducer from './userInputSlice';
import puzzleStateReducer from './puzzleStateSlice';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    solution: solutionReducer,
    userContent: inputReducer,
    puzzleState: puzzleStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
