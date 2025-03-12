import * as React from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { getContainingAnswer } from './utils';
import {
  setDirection,
  setSelectedAnswer,
  setSelectedAnswerKey,
} from './selectionSlice';
import { Direction } from './types';

export function useSelectionUpdates() {
  const devSolution = useAppSelector((state) => state.solution.devSolution);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const dispatch = useAppDispatch();

  const updateAnswer = React.useCallback(
    (params: {
      cell?: { row: number; col: number };
      direction?: Direction;
    }) => {
      const row = params.cell?.row ?? selections.row;
      const col = params.cell?.col ?? selections.col;
      const newDirection = params.direction ?? selections.direction;

      if (row !== null && col !== null) {
        const result = getContainingAnswer(
          row,
          col,
          newDirection,
          devSolution.clues
        );
        if (result) {
          if (params.direction) {
            dispatch(setDirection(newDirection));
          }
          dispatch(setSelectedAnswer(result.answer));
          dispatch(setSelectedAnswerKey(result.key));
        }
      }
    },
    [
      selections.row,
      selections.col,
      selections.direction,
      devSolution.clues,
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
