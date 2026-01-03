import React from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { setSelection } from './selectionSlice';
import { ClueDirection } from './types';
import { getContainingAnswer } from './utils';

export function useSelectionUpdates() {
  const clues = useAppSelector((s) => s.solution.dataByCell.clues);
  const row = useAppSelector((s) => s.selection.row);
  const col = useAppSelector((s) => s.selection.col);
  const direction = useAppSelector((s) => s.selection.direction);
  const dispatch = useAppDispatch();

  const updateAnswer = React.useCallback(
    (params: {
      cell?: { row: number; col: number };
      direction?: ClueDirection;
    }) => {
      const nextRow = params.cell?.row ?? row;
      const nextCol = params.cell?.col ?? col;
      const nextDir = params.direction ?? direction;

      if (nextRow == null || nextCol == null) return;

      const result = getContainingAnswer(nextRow, nextCol, nextDir, clues);
      if (!result) return;

      dispatch(
        setSelection({
          row: nextRow,
          col: nextCol,
          direction: nextDir,
          answer: result.answer,
          answerNum: result.num,
          answerKey: result.key,
        })
      );
    },
    [row, col, direction, clues, dispatch]
  );

  const toggleDirection = React.useCallback(() => {
    updateAnswer({ direction: direction === 'across' ? 'down' : 'across' });
  }, [direction, updateAnswer]);

  return { updateAnswer, toggleDirection };
}
