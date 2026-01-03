import * as React from 'react';
import classNames from 'classnames';
import styles from './crossword.module.scss';
import { useAppSelector } from './hooks';
import { answerContainsCell, rowColToKey } from './utils';
import { ICell } from './types';
import { useSelectionUpdates } from './useSelectionUpdates';

function CellImpl(props: ICell) {
  const { row, col, answerContent, uiNum } = props;
  const cellKey = rowColToKey(row, col);
  const selectedAnswerKey = useAppSelector(
    (state) => state.selection.answerKey
  );

  const selectedRow = useAppSelector((state) => state.selection.row);
  const selectedCol = useAppSelector((state) => state.selection.col);
  const isSelected = selectedRow === row && selectedCol === col;
  const direction = useAppSelector((state) => state.selection.direction);
  const dataByCell = useAppSelector((state) => state.solution.dataByCell);
  const userContent = useAppSelector(
    (state) => state.userContent.grid[cellKey].content
  );
  const isCorrect = useAppSelector(
    (state) => state.userContent.grid[cellKey].isCorrect
  );
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
    [styles.selected]: isSelected,
    [styles.black]: answerContent == null,
    [styles.wrong]: !isCorrect,
  });

  return (
    <div
      className={cellClasses}
      onClick={() => {
        if (selectedRow === row && selectedCol === col) {
          // Clicked on same cell, change direction but not cell selection.
          toggleDirection();
          return;
        }
        updateAnswer({ cell: { row, col } });
      }}
    >
      <div className={styles['number-container']}>{uiNum}</div>
      <div className={styles['content-container']}>{userContent}</div>
    </div>
  );
}

export const Cell = React.memo(CellImpl);
