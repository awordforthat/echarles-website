import * as React from 'react';
import classNames from 'classnames';
import styles from './crossword.module.scss';
import {
  setSelectedCell,
  setSelectedAnswer,
  setSelectedAnswerKey,
} from './selectionSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { answerContainsCell, getContainingAnswer } from './utils';
import { ICell } from './types';
import { useSelectionUpdates } from './useSelectionUpdates';

export function Cell(props: ICell & { userContent: string | null }) {
  const { row, col, number, content: answerContent, userContent } = props;
  const dispatch = useAppDispatch();
  const selectedAnswerKey = useAppSelector(
    (state) => state.selection.answerKey
  );
  const selectedCell = useAppSelector((state) => {
    return { row: state.selection.row, col: state.selection.col };
  });
  const direction = useAppSelector((state) => state.selection.direction);
  const devSolution = useAppSelector((state) => state.solution.devSolution);
  const { toggleDirection } = useSelectionUpdates();
  const cellClasses = classNames(styles.cell, {
    [styles['selected-secondary']]:
      selectedAnswerKey &&
      answerContainsCell(
        selectedAnswerKey,
        devSolution.clues[direction][selectedAnswerKey],
        row,
        col,
        direction
      ),
    [styles.selected]: selectedCell.row == row && selectedCell.col == col,
    [styles.black]: answerContent == null,
  });

  return (
    <div
      className={cellClasses}
      onClick={() => {
        if (selectedCell.row === row && selectedCell.col === col) {
          // Clicked on same cell, change direction but not cell selection.
          toggleDirection();
          return;
        }
        // TODO: combine with above
        if (answerContent) {
          const result = getContainingAnswer(
            row,
            col,
            direction,
            devSolution.clues
          );
          dispatch(setSelectedCell({ row, col }));
          if (result) {
            dispatch(setSelectedAnswer(result.answer));
            dispatch(setSelectedAnswerKey(result.key));
          }
        }
      }}
    >
      <div className={styles['number-container']}>{number}</div>
      <div className={styles['content-container']}>{userContent?.[0]}</div>
    </div>
  );
}
