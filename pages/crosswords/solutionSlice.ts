// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hopskipjumpsolution } from './hopskipjump';
import { Crossword } from './types';

const initialState = hopskipjumpsolution;
const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setSolution: (state, action: PayloadAction<Crossword>) => {
      state = action.payload;
    },
  },
});

export const { setSolution } = solutionSlice.actions;
export default solutionSlice.reducer;
