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
    setSelectedCell: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
    },
    setSelectedAnswer: (state, action: PayloadAction<Answer>) => {
      state.answer = action.payload;
    },
    setSelectedAnswerNum: (state, action: PayloadAction<number>) => {
      state.answerNum = action.payload;
    },
    setSelectedAnswerKey: (state, action: PayloadAction<string>) => {
      state.answerKey = action.payload;
    },
    setDirection: (state, action: PayloadAction<ClueDirection>) => {
      state.direction = action.payload;
    },
  },
});

export const {
  setSelectedCell,
  setSelectedAnswer,
  setSelectedAnswerNum,
  setSelectedAnswerKey,
  setDirection,
} = selectionSlice.actions;
export default selectionSlice.reducer;
