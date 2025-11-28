import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const puzzleStateSlice = createSlice({
  name: 'puzzleState',
  initialState: { showModal: false, solved: false, isGridCorrect: true },
  reducers: {
    showModal: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showModal = false;
      action.payload.show;
    },
    solve: (state) => {
      state.solved = true;
    },
    unsolve: (state) => {
      state.solved = false;
    },
    updateIsGridCorrect: (
      state,
      action: PayloadAction<{ isCorrect: boolean }>
    ) => {
      state.isGridCorrect = state.isGridCorrect && action.payload.isCorrect;
    },
  },
});

export const { showModal, solve, unsolve, updateIsGridCorrect } =
  puzzleStateSlice.actions;
export default puzzleStateSlice.reducer;
