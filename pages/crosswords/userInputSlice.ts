import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateBlankGrid, isCellCorrect } from './utils';
import { Grid, UserContent } from './types';

const userSolution: UserContent = generateBlankGrid(15);

const inputSlice = createSlice({
  name: 'userInput',
  initialState: { grid: userSolution, numCorrectCells: 0 },
  reducers: {
    setCellContent: (
      state,
      action: PayloadAction<{
        cellKey: string;
        content: string;
        answers: Grid;
      }>
    ) => {
      const origCellState = state.grid[action.payload.cellKey];
      state.grid[action.payload.cellKey].content = action.payload.content;

      const isCorrect = isCellCorrect(
        action.payload.content,
        action.payload.cellKey,
        action.payload.answers
      );
      if (!origCellState.isCorrect && isCorrect) {
        state.numCorrectCells += 1;
      }
      if (origCellState.isCorrect && !isCorrect) {
        state.numCorrectCells -= 1;
      }
    },
  },
});

export const { setCellContent } = inputSlice.actions;
export default inputSlice.reducer;
