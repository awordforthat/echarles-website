import React, { useEffect, useRef, useCallback } from 'react';
import { ClueDirection } from './types';
import { useAppSelector } from './hooks';

import styles from './crossword.module.scss';
import classNames from 'classnames';
import { useSelectionUpdates } from './useSelectionUpdates';
import { keyToRowCol } from './utils';

interface IClueContainerProps {
  direction: ClueDirection;
}

interface IClueProps {
  number: number | undefined;
  direction: ClueDirection;
  rowNum: number;
  colNum: number;
  text: string;
  selectedPrimary: boolean;
  selectedSecondary: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (rowNum: number, colNum: number) => void;
}
const Clue = React.memo(function Clue(props: IClueProps) {
  const {
    number,
    rowNum,
    colNum,
    text,
    selectedPrimary,
    selectedSecondary,
    onClick,
  } = props;

  const handleClick = React.useCallback(() => {
    onClick(rowNum, colNum);
  }, [onClick, rowNum, colNum]);

  const clueClasses = classNames(styles.clue, {
    [styles.selectedPrimary]: selectedPrimary,
    [styles.selectedSeconary]: selectedSecondary,
  });

  return (
    <div className={clueClasses} onClick={handleClick}>
      <div className={styles.numberContainer}>{number}</div>
      <div className={styles.textContainer}>{text}</div>
    </div>
  );
});

export function ClueContainer({ direction }: IClueContainerProps) {
  const clues = useAppSelector((s) => s.solution.dataByClue[direction]);

  const selectedAnswerKey = useAppSelector((s) => s.selection.answerKey);
  const selectedDirection = useAppSelector((s) => s.selection.direction);
  const selectedAnswerNum = useAppSelector((s) => s.selection.answerNum);

  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedDirection !== direction) return;
    const el = selectedRef.current;
    if (!el) return;
    el.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'auto',
    });
  }, [selectedAnswerKey, selectedDirection, direction]);

  const { updateAnswer } = useSelectionUpdates();

  const handleClueClick = useCallback(
    (rowNum: number, colNum: number) => {
      updateAnswer({ direction, cell: { row: rowNum, col: colNum } });
    },
    [updateAnswer, direction]
  );

  return (
    <div className={styles.clueContainer}>
      <div className={styles.title}>{direction}</div>
      <div className={styles.scrollable}>
        {clues.map((c) => {
          const [rowNum, colNum] = keyToRowCol(c.key);
          const id = `clue-${c.key}-${direction}`;

          const isSelected =
            c.key === selectedAnswerKey && direction === selectedDirection;

          return (
            <div key={id} ref={isSelected ? selectedRef : null}>
              <Clue
                direction={direction}
                number={c.number}
                rowNum={rowNum}
                colNum={colNum}
                text={c.clue}
                selectedPrimary={
                  c.number === selectedAnswerNum &&
                  direction === selectedDirection
                }
                selectedSecondary={false}
                onClick={handleClueClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
