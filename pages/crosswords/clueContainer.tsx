import React, { useEffect, useRef, useCallback } from 'react';
import { ClueDirection, DataByClueAnswerContent } from './types';
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
const Clue = React.memo(function Clue(props: Omit<IClueProps, 'direction'>) {
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

const ClueWrapper = React.memo(
  function ClueRow({
    clue,
    direction,
    selectedAnswerKey,
    selectedDirection,
    selectedAnswerNum,
    onClick,
    setSelectedRef,
  }: {
    clue: DataByClueAnswerContent;
    direction: ClueDirection;
    selectedAnswerKey: string | null;
    selectedDirection: ClueDirection;
    selectedAnswerNum: number | null;
    // eslint-disable-next-line no-unused-vars
    onClick: (row: number, col: number) => void;
    // eslint-disable-next-line no-unused-vars
    setSelectedRef: (el: HTMLDivElement | null) => void;
  }) {
    const [rowNum, colNum] = keyToRowCol(clue.key);

    const selectedPrimary =
      clue.number === selectedAnswerNum && direction === selectedDirection;

    const isSelected =
      clue.key === selectedAnswerKey && direction === selectedDirection;

    return (
      <div ref={isSelected ? setSelectedRef : null}>
        <Clue
          number={clue.number}
          rowNum={rowNum}
          colNum={colNum}
          text={clue.clue}
          selectedPrimary={selectedPrimary}
          selectedSecondary={false}
          onClick={onClick}
        />
      </div>
    );
  },
  (prev, next) => {
    if (prev.clue !== next.clue) return false; // clue object identity changed
    const prevIsSelected =
      prev.clue.key === prev.selectedAnswerKey &&
      prev.direction === prev.selectedDirection;
    const nextIsSelected =
      next.clue.key === next.selectedAnswerKey &&
      next.direction === next.selectedDirection;

    const prevPrimary =
      prev.clue.number === prev.selectedAnswerNum &&
      prev.direction === prev.selectedDirection;
    const nextPrimary =
      next.clue.number === next.selectedAnswerNum &&
      next.direction === next.selectedDirection;

    return (
      prevIsSelected === nextIsSelected &&
      prevPrimary === nextPrimary &&
      prev.onClick === next.onClick
    );
  }
);

const ClueList = React.memo(function ClueList({
  clues,
  direction,
  selectedAnswerKey,
  selectedAnswerNum,
  onClick,
  setSelectedRef,
}: {
  clues: DataByClueAnswerContent[];
  direction: ClueDirection;
  selectedAnswerKey: string | null;
  selectedAnswerNum: number | null;
  // eslint-disable-next-line no-unused-vars
  onClick: (row: number, col: number) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedRef: (el: HTMLDivElement) => void;
}) {
  return (
    <>
      {clues.map((clue) => (
        <ClueWrapper
          key={clue.key}
          clue={clue}
          direction={direction}
          selectedAnswerKey={selectedAnswerKey}
          selectedDirection={direction}
          selectedAnswerNum={selectedAnswerNum}
          onClick={onClick}
          setSelectedRef={setSelectedRef}
        />
      ))}
    </>
  );
});

export function ClueContainer({ direction }: IClueContainerProps) {
  const clues = useAppSelector((s) => s.solution.dataByClue[direction]);

  const selectedAnswerKey = useAppSelector((s) => s.selection.answerKey);
  const selectedDirection = useAppSelector((s) => s.selection.direction);
  const selectedAnswerNum = useAppSelector((s) => s.selection.answerNum);

  const selectedRef = useRef<HTMLDivElement | null>(null);
  const setSelectedRef = useCallback((el: HTMLDivElement | null) => {
    selectedRef.current = el;
  }, []);

  useEffect(() => {
    if (selectedDirection !== direction) return;
    const el = selectedRef.current;
    if (!el) return;
    el.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
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
        <ClueList
          clues={clues}
          direction={direction}
          selectedAnswerKey={selectedAnswerKey}
          selectedAnswerNum={selectedAnswerNum}
          onClick={handleClueClick}
          setSelectedRef={setSelectedRef}
        />
      </div>
    </div>
  );
}
