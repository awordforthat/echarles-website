import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const puzzleStateSlice = createSlice({
  name: 'puzzleState',
  initialState: { showModal: false, solved: false },
  reducers: {
    showModal: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showModal = action.payload.show;
    },
    solve: (state) => {
      state.solved = true;
    },
    unsolve: (state) => {
      state.solved = false;
    },
  },
});

export const { showModal, solve, unsolve } = puzzleStateSlice.actions;
export default puzzleStateSlice.reducer;
