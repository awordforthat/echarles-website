import { useEffect, useRef } from 'react';
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
}
function Clue(props: IClueProps) {
  const {
    number,
    direction,
    rowNum,
    colNum,
    text,
    selectedPrimary,
    selectedSecondary,
  } = props;
  const { updateAnswer } = useSelectionUpdates();
  const clueClasses = classNames(styles.clue, {
    [styles.selectedPrimary]: selectedPrimary,
    [styles.selectedSeconary]: selectedSecondary,
  });
  return (
    <div
      className={clueClasses}
      onClick={() =>
        updateAnswer({ direction, cell: { row: rowNum, col: colNum } })
      }
    >
      <div className={styles.numberContainer}>{number}</div>
      <div className={styles.textContainer}>{text}</div>
    </div>
  );
}

export function ClueContainer(props: IClueContainerProps) {
  const { direction } = props;
  const clues = useAppSelector((state) => state.solution.dataByClue[direction]);
  const selectedClue = useAppSelector((state) => state.selection);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const selections = useAppSelector((state) => state.selection);

  useEffect(() => {
    if (!selectedRef.current) return;
    if (!selections) return;

    selectedRef.current.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }, [selections]);

  return (
    <div className={styles.clueContainer} ref={containerRef}>
      <div className={styles.title}>{direction}</div>
      <div className={styles.scrollable}>
        {clues.map((c) => {
          const [rowNum, colNum] = keyToRowCol(c.key);
          const id = `clue-${c.key}-${direction}`;
          const isSelected =
            c.key === selections.answerKey &&
            direction === selections.direction;
          return (
            <div key={id} ref={isSelected ? selectedRef : null}>
              <Clue
                direction={direction}
                number={c.number}
                rowNum={rowNum}
                colNum={colNum}
                text={c.clue}
                selectedPrimary={
                  c.number === selectedClue.answerNum &&
                  direction == selectedClue.direction
                }
                // TODO: precalculate cross clue
                selectedSecondary={false && direction != selectedClue.direction}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
