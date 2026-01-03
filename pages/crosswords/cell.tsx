import * as React from 'react';
import classNames from 'classnames';
import styles from './crossword.module.scss';
import { useAppSelector } from './hooks';
import { rowColToKey } from './utils';
import { ICell } from './types';

function CellImpl(
  props: ICell & {
    isSelected: boolean;
    isSecondary: boolean;
    onClick: () => void;
  }
) {
  const { row, col, answerContent, uiNum, isSelected, isSecondary, onClick } =
    props;
  const cellKey = rowColToKey(row, col);
  const userContent = useAppSelector(
    (state) => state.userContent.grid[cellKey].content
  );
  const isCorrect = useAppSelector(
    (state) => state.userContent.grid[cellKey].isCorrect
  );
  const cellClasses = classNames(styles.cell, {
    [styles['selected-secondary']]: isSecondary,
    [styles.selected]: isSelected,
    [styles.black]: answerContent == null,
    [styles.wrong]: !isCorrect,
  });

  return (
    <div className={cellClasses} onClick={onClick}>
      <div className={styles['number-container']}>{uiNum}</div>
      <div className={styles['content-container']}>{userContent}</div>
    </div>
  );
}

export const Cell = React.memo(CellImpl);
