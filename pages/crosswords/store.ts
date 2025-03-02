import { configureStore } from '@reduxjs/toolkit';
import selectedCellReducer from './cellSlice';
import solutionReducer from './solutionSlice';

export const store = configureStore({
  reducer: {
    selectedCell: selectedCellReducer,
    solution: solutionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
