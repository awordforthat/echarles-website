import * as React from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { getContainingAnswer } from './utils';
import {
  setDirection,
  setSelectedAnswer,
  setSelectedAnswerKey,
  setSelectedAnswerNum,
  setSelectedCell,
} from './selectionSlice';
import { ClueDirection } from './types';

export function useSelectionUpdates() {
  const dataByCell = useAppSelector((state) => state.solution.dataByCell);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const dispatch = useAppDispatch();

  const updateAnswer = React.useCallback(
    (params: {
      cell?: { row: number; col: number };
      direction?: ClueDirection;
    }) => {
      const row = params.cell?.row ?? selections.row;
      const col = params.cell?.col ?? selections.col;
      const newDirection = params.direction ?? selections.direction;
      if (row !== null && col !== null) {
        const result = getContainingAnswer(
          row,
          col,
          newDirection,
          dataByCell.clues
        );

        if (result) {
          if (params.direction) {
            dispatch(setDirection(newDirection));
          }
          dispatch(setSelectedAnswer(result.answer));
          dispatch(setSelectedAnswerNum(result.num));
          dispatch(setSelectedAnswerKey(result.key));
          dispatch(setSelectedCell({ row, col }));
        }
      }
    },
    [
      selections.row,
      selections.col,
      selections.direction,
      dataByCell.clues,
      dispatch,
    ]
  );

  const toggleDirection = React.useCallback(() => {
    updateAnswer({
      direction: direction === 'across' ? 'down' : 'across',
    });
  }, [direction, updateAnswer]);

  return { updateAnswer, toggleDirection };
}
