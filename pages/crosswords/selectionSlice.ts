// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, Direction } from './types';
import { getContainingAnswer } from './utils';
import { hopskipjumpclues } from './hopskipjump';

interface SelectionState {
  row: number;
  col: number;
  answer: Answer | null;
  answerKey: string | null;
  direction: Direction;
}

const initialState: SelectionState = {
  row: 0,
  col: 0,
  answer: null,
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
    setSelectedAnswerKey: (state, action: PayloadAction<string>) => {
      state.answerKey = action.payload;
    },
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload;
      const newAnswer = getContainingAnswer(
        state.row ?? 0,
        state.col ?? 0,
        action.payload,
        hopskipjumpclues
      );
      console.log(newAnswer);
    },
  },
});

export const {
  setSelectedCell,
  setSelectedAnswer,
  setSelectedAnswerKey,
  setDirection,
} = selectionSlice.actions;
export default selectionSlice.reducer;
