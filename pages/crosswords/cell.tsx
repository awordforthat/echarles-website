import * as React from 'react';
import classNames from 'classnames';
import styles from './crossword.module.scss';
import { useAppSelector } from './hooks';
import {
  answerContainsCell,
  getContainingAnswer,
  keyToRowCol,
  rowColToKey,
} from './utils';
import { ICell } from './types';
import { useSelectionUpdates } from './useSelectionUpdates';

export function Cell(props: ICell & { userContent: string | null }) {
  const { row, col, number, content: answerContent, userContent } = props;
  const selectedAnswerKey = useAppSelector(
    (state) => state.selection.answerKey
  );
  const selectedCell = useAppSelector((state) => {
    return { row: state.selection.row, col: state.selection.col };
  });
  const direction = useAppSelector((state) => state.selection.direction);
  const dataByCell = useAppSelector((state) => state.solution.dataByCell);
  const { toggleDirection, updateAnswer } = useSelectionUpdates();
  const cellClasses = classNames(styles.cell, {
    [styles['selected-secondary']]:
      selectedAnswerKey &&
      answerContainsCell(
        selectedAnswerKey,
        dataByCell.clues[direction][selectedAnswerKey],
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
        updateAnswer({ cell: { row, col } });
      }}
    >
      <div className={styles['number-container']}>{number}</div>
      <div className={styles['content-container']}>{userContent?.[0]}</div>
    </div>
  );
}
