/* eslint-disable no-fallthrough */
/* eslint-disable no-redeclare */
import React from 'react';
import styles from './crossword.module.scss';
import { Cell } from './cell';
import { useAppSelector } from './hooks';
import { useSelectionUpdates } from './useSelectionUpdates';
import {
  getNextCellAutoNavigation,
  getNextCellManualNavigation,
  isGridComplete,
  isGridCorrect,
  keyToRowCol,
  rowColToKey,
} from './utils';
import { useDispatch } from 'react-redux';
import { NavigationDirection, UserContent } from './types';
import { setDataByCell } from './solutionSlice';
import { hopskipjumpsolution } from './hopskipjump';
import { setCellContent } from './userInputSlice';
import { store } from './store';
import CompletionModal from './puzzleCompleteModal';
import { showModal, solve, unsolve } from './puzzleStateSlice';
import { ClueContainer } from './clueContainer';

export function Crossword() {
  const crosswordDef = useAppSelector((state) => state.solution.dataByCell);
  const answersByClue = useAppSelector((state) => state.solution.dataByClue);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const dataByCell = useAppSelector((s) => s.solution.dataByCell);
  const solved = useAppSelector((state) => state.puzzleState.solved);

  const selectedRow = useAppSelector((s) => s.selection.row);
  const selectedCol = useAppSelector((s) => s.selection.col);

  const showCompletionModal = useAppSelector(
    (state) => state.puzzleState.showModal
  );

  const dispatch = useDispatch();
  const { updateAnswer, toggleDirection } = useSelectionUpdates();

  const selectedAnswerKey = useAppSelector((s) => s.selection.answerKey);

  const secondarySet = React.useMemo(() => {
    if (!selectedAnswerKey) return new Set<string>();
    const [selectedRow, selectedCol] = keyToRowCol(selectedAnswerKey);
    const clue = dataByCell.clues[direction][selectedAnswerKey];
    const keys = new Set<string>();
    let counter = 0;
    for (const _ of clue.answer) {
      if (direction === 'across') {
        keys.add(rowColToKey(selectedRow, selectedCol + counter));
      } else {
        keys.add(rowColToKey(selectedRow + counter, selectedCol));
      }
      counter++;
    }
    return keys;
  }, [selectedAnswerKey, direction, dataByCell]);

  React.useEffect(() => {
    dispatch(setDataByCell(hopskipjumpsolution));
  }, [dispatch]);

  const fillGrid = React.useCallback(
    (correct: boolean) => {
      Object.keys(crosswordDef.grid).forEach((key) => {
        if (correct) {
          dispatch(
            setCellContent({
              cellKey: key,
              content: crosswordDef.grid[key].answerContent ?? '',
              answers: crosswordDef.grid,
            })
          );
        } else {
          dispatch(
            setCellContent({
              cellKey: key,
              content: 'A',
              answers: crosswordDef.grid,
            })
          );
        }
      });
    },
    [crosswordDef, dispatch]
  );

  const handleArrowKeys = React.useCallback(
    (e: React.KeyboardEvent) => {
      const currentCell = {
        row: selections.row ?? 0,
        col: selections.col ?? 0,
      };
      let navDirection: NavigationDirection = 'up';
      switch (e.code) {
        case 'ArrowUp':
          navDirection = 'up';
          break;
        case 'ArrowDown':
          navDirection = 'down';
          break;
        case 'ArrowLeft':
          navDirection = 'left';
          break;
        case 'ArrowRight':
          navDirection = 'right';
          break;
      }

      // If the arrow key is on the opposite axis than the current nav direction,
      // just toggle direction, don't advance the selection.
      if (
        (direction == 'across' && ['up', 'down'].includes(navDirection)) ||
        (direction == 'down' && ['left', 'right'].includes(navDirection))
      ) {
        toggleDirection();
        return;
      }

      const nextCell = getNextCellManualNavigation(
        currentCell,
        navDirection,
        crosswordDef
      );

      updateAnswer({ cell: nextCell });
    },
    [
      direction,
      selections.col,
      selections.row,
      crosswordDef,
      toggleDirection,
      updateAnswer,
    ]
  );
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const currentCell = {
        row: selections.row ?? 0,
        col: selections.col ?? 0,
      };
      if (currentCell.row == null || currentCell.col == null) return;

      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        e.preventDefault();
        handleArrowKeys(e);
        return;
      }

      if (e.key.length === 1) {
        dispatch(
          setCellContent({
            cellKey: `${selections.row},${selections.col}`,
            content: e.key,
            answers: crosswordDef.grid,
          })
        );
        // Accessing the store directly here ensures that we have
        // the update that was just made, which is used in the auto navigation call.
        const updatedUserContent: UserContent =
          store.getState().userContent.grid;

        if (!selections.answer) return;

        if (isGridComplete(updatedUserContent)) {
          updateAnswer({ cell: { row: 0, col: 0 } });
          dispatch(showModal({ show: true }));
          const isWin = isGridCorrect(updatedUserContent, crosswordDef.grid);
          if (isWin) {
            dispatch(solve());
            return;
          }
          dispatch(unsolve());
        } else {
          dispatch(unsolve());
        }
        const nextCellAuto = getNextCellAutoNavigation(
          currentCell,
          direction,
          updatedUserContent,
          crosswordDef,
          answersByClue
        );
        updateAnswer({ cell: nextCellAuto });

        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          e.stopPropagation();
          updateAnswer({ cell: currentCell });
          toggleDirection();
          break;
        case 'Backspace':
          dispatch(
            setCellContent({
              cellKey: `${selections.row},${selections.col}`,
              content: '',
              answers: crosswordDef.grid,
            })
          );
          const nextCell = getNextCellManualNavigation(
            currentCell,
            direction == 'across' ? 'left' : 'up',
            crosswordDef
          );
          updateAnswer({ cell: nextCell });
      }
    },
    [
      selections.row,
      selections.col,
      selections.answer,
      handleArrowKeys,
      dispatch,
      crosswordDef,
      direction,
      answersByClue,
      updateAnswer,
      toggleDirection,
    ]
  );

  // TODO: extract to separate component.
  const grid = React.useMemo(() => {
    const rows = [];
    for (let row = 0; row < crosswordDef.gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < crosswordDef.gridSize; col++) {
        const key = rowColToKey(row, col);
        const cellAnswer = crosswordDef.grid[key];

        if (cellAnswer?.answerContent == null) {
          currentRow.push(
            <Cell
              key={key}
              row={row}
              col={col}
              isSelected={false}
              isSecondary={false}
              onClick={() => {}}
            />
          );
        } else {
          const isSelected = row === selectedRow && col === selectedCol;

          currentRow.push(
            <Cell
              key={key}
              row={row}
              col={col}
              uiNum={cellAnswer.uiNum}
              answerContent={cellAnswer.answerContent}
              isSelected={isSelected}
              isSecondary={Boolean(secondarySet && secondarySet.has(key))}
              onClick={() => {
                if (isSelected) toggleDirection();
                else updateAnswer({ cell: { row, col } });
              }}
            />
          );
        }
      }
      rows.push(
        <div key={`row-${row}`} className={styles.row}>
          {currentRow}
        </div>
      );
    }
    return rows;
  }, [crosswordDef.grid, crosswordDef.gridSize, secondarySet]);

  return (
    <div className={styles.page}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h2>The Crossword</h2>
          <div className={styles.secondaryTitle}>
            # {hopskipjumpsolution.index}
          </div>
        </div>
        <div className={styles.byline}>by Emily Wachtel</div>
      </div>

      <div className={styles.contentPositioner}>
        <div>
          <div className={styles.currentClue}>{selections.answer?.clue}</div>
          <div
            tabIndex={0}
            className={styles.crossword}
            onKeyDown={handleKeyDown}
          >
            {grid}
            {showCompletionModal && (
              <CompletionModal
                onClose={() => {
                  dispatch(showModal({ show: false }));
                }}
                title={solved ? 'Solved!' : 'Not yet'}
                message={
                  solved ? 'Nicely done!' : "Hmm, something's still amiss..."
                }
              />
            )}
            {/* <div>Solved: {solved}</div>
          <button
            style={{ width: 100 }}
            onClick={() => {
              fillGrid(false);
            }}
          >
            Fill grid (incorrect)
          </button>
          <button
            style={{ width: 100 }}
            onClick={() => {
              fillGrid(true);
            }}
          >
            Fill grid (correct)
          </button> */}
          </div>
        </div>
        <div className={styles.clueContainerContainer}>
          <ClueContainer direction={'across'} />
          <ClueContainer direction={'down'} />
        </div>
      </div>
    </div>
  );
}
