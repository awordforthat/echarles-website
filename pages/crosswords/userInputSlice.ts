import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateBlankGrid } from './utils';

const userSolution: Record<string, string | null> = generateBlankGrid(15);

const inputSlice = createSlice({
  name: 'userInput',
  initialState: { grid: userSolution },
  reducers: {
    setCellContent: (
      state,
      action: PayloadAction<{ cellKey: string; content: string }>
    ) => {
      state.grid[action.payload.cellKey] = action.payload.content;
    },
  },
});

export const { setCellContent } = inputSlice.actions;
export default inputSlice.reducer;
