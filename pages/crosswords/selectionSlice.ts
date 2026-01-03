// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, ClueDirection } from './types';

interface SelectionState {
  row: number;
  col: number;
  answer: Answer | null;
  answerNum: number; // number shown in grid, not 0-indexed
  answerKey: string | null;
  direction: ClueDirection;
}

const initialState: SelectionState = {
  row: 0,
  col: 0,
  answer: null,
  answerNum: 1,
  answerKey: null,
  direction: 'across',
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<Partial<SelectionState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
