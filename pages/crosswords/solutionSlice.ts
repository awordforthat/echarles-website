// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hopskipjumpsolution } from './hopskipjump';
import { Crossword, HumanSolution } from './types';
import { generateHumanSolution } from './utils';

const initialState = {
  devSolution: hopskipjumpsolution,
  humanSolution: generateHumanSolution(hopskipjumpsolution),
};
const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setSolution: (state, action: PayloadAction<Crossword>) => {
      state.devSolution = action.payload;
    },
    setHumanSolution: (state, action: PayloadAction<HumanSolution>) => {
      state.humanSolution = action.payload;
    },
  },
});

export const { setSolution } = solutionSlice.actions;
export default solutionSlice.reducer;
