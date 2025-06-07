// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hopskipjumpsolution } from './hopskipjump';
import { Crossword, DataByClue } from './types';
import { generateDataByClue } from './utils';

const initialState = {
  dataByCell: hopskipjumpsolution,
  dataByClue: generateDataByClue(hopskipjumpsolution),
};
const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setDataByCell: (state, action: PayloadAction<Crossword>) => {
      state.dataByCell = action.payload;
    },
    setDataByClue: (state, action: PayloadAction<DataByClue>) => {
      state.dataByClue = action.payload;
    },
  },
});

export const { setDataByClue, setDataByCell } = solutionSlice.actions;
export default solutionSlice.reducer;
