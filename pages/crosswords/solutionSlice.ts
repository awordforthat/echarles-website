// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crossword } from './solution';
import { hopskipjumpsolution } from './hopskipjump';

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
