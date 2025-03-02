import * as React from 'react';
import styles from './crossword.module.scss';
import { setSelectedCell } from './cellSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { ICell } from './solution';

export function Cell(props: ICell) {
  const { row, col, number, answerContent, userContent } = props;
  const dispatch = useAppDispatch();
  const selectedCell = useAppSelector((state) => state.selectedCell);
  return (
    <div
      className={`${styles.cell} ${
        selectedCell.row == row && selectedCell.col == col
          ? styles.selected
          : ''
      } ${answerContent == null ? styles.black : ''}`}
      onClick={() => {
        if (answerContent) dispatch(setSelectedCell({ row, col }));
      }}
    >
      <div className={styles['number-container']}>{number}</div>
      <div className={styles['content-container']}>{answerContent?.[0]}</div>
    </div>
  );
}
