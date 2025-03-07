import * as React from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { getContainingAnswer } from './utils';
import {
  setDirection,
  setSelectedAnswer,
  setSelectedAnswerKey,
} from './selectionSlice';
import { Direction } from './types';

export function useAnswerChange() {
  const solution = useAppSelector((state) => state.solution);
  const selections = useAppSelector((state) => state.selection);
  const dispatch = useAppDispatch();

  const updateAnswerInPlace = React.useCallback(
    (newDirection: Direction) => {
      if (selections.row !== null && selections.col !== null) {
        const result = getContainingAnswer(
          selections.row,
          selections.col,
          newDirection, // Use the new direction value directly
          solution.clues
        );
        if (result) {
          dispatch(setDirection(newDirection));
          dispatch(setSelectedAnswer(result.answer));
          dispatch(setSelectedAnswerKey(result.key));
        }
      }
    },
    [dispatch, selections.col, selections.row, solution.clues]
  );
  
  const updateAnswerNewCell = React.useCallback((newCell: {row: number, col: number}) {
    const result = getContainingAnswer(
      newCell.row,
      newCell.col,
      selections.direction,
      solution.clues
    );
    if (result) {
      dispatch(setSelectedAnswer(result.answer));
      dispatch(setSelectedAnswerKey(result.key));
    }
  }, [])

  return { updateAnswerNewCell, updateAnswerInPlace };
}
