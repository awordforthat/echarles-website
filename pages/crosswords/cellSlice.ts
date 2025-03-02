// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCellState {
  row: number | null;
  col: number | null;
}

const initialState: SelectedCellState = {
  row: null,
  col: null,
};

const selectedCellSlice = createSlice({
  name: 'selectedCell',
  initialState,
  reducers: {
    setSelectedCell: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
    },
  },
});

export const { setSelectedCell } = selectedCellSlice.actions;
export default selectedCellSlice.reducer;
