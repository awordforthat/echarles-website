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
  rowColToKey,
} from './utils';
import { useDispatch } from 'react-redux';
import { Grid, NavigationDirection, UserContent } from './types';
import { setDataByCell } from './solutionSlice';
import { hopskipjumpsolution } from './hopskipjump';
import { setCellContent } from './userInputSlice';
import { store } from './store';
import CompletionModal from './puzzleCompleteModal';
import { showModal, solve, unsolve } from './puzzleStateSlice';

export function Crossword() {
  const answersByCell = useAppSelector((state) => state.solution.dataByCell);
  const answersByClue = useAppSelector((state) => state.solution.dataByClue);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const userContent = useAppSelector((state) => state.userContent.grid);
  const showCompletionModal = useAppSelector(
    (state) => state.puzzleState.showModal
  );
  const solved = useAppSelector((state) => state.puzzleState.solved);

  const dispatch = useDispatch();
  const { updateAnswer, toggleDirection } = useSelectionUpdates();

  React.useEffect(() => {
    dispatch(setDataByCell(hopskipjumpsolution));
  }, [dispatch]);

  const fillGrid = React.useCallback(
    (correct: boolean) => {
      Object.keys(answersByCell.grid).forEach((key) => {
        if (correct) {
          dispatch(
            setCellContent({
              cellKey: key,
              content: answersByCell.grid[key].answerContent ?? '',
              answers: answersByCell.grid,
            })
          );
        } else {
          dispatch(
            setCellContent({
              cellKey: key,
              content: 'A',
              answers: answersByCell.grid,
            })
          );
        }
      });
    },
    [answersByCell, dispatch]
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
        answersByCell
      );

      updateAnswer({ cell: nextCell });
    },
    [
      direction,
      selections.col,
      selections.row,
      answersByCell,
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
            answers: answersByCell.grid,
          })
        );
        // Accessing the store directly here ensures that we have
        // the update that was just made, which is used in the auto navigation call.
        const updatedUserContent: UserContent =
          store.getState().userContent.grid;
        console.log(updatedUserContent);
        if (!selections.answer) return;

        if (isGridComplete(updatedUserContent)) {
          updateAnswer({ cell: { row: 0, col: 0 } });
          dispatch(showModal({ show: true }));
          const isWin = isGridCorrect(updatedUserContent, answersByCell.grid);
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
          answersByCell.grid,
          updatedUserContent,
          answersByClue,
          answersByCell
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
              answers: answersByCell.grid,
            })
          );
          const nextCell = getNextCellManualNavigation(
            currentCell,
            direction == 'across' ? 'left' : 'up',
            answersByCell
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
      answersByCell,
      direction,
      answersByClue,
      updateAnswer,
      toggleDirection,
    ]
  );

  const renderGrid = React.useCallback(() => {
    const rows = [];
    for (let row = 0; row < answersByCell.gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < answersByCell.gridSize; col++) {
        const key = rowColToKey(row, col);
        const cellAnswer = answersByCell.grid[key];

        if (cellAnswer?.answerContent == null) {
          currentRow.push(
            <Cell
              key={key}
              row={row}
              col={col}
              userContent={null}
              isCorrect={false}
            />
          );
          continue;
        }

        currentRow.push(
          <Cell
            key={key}
            row={row}
            col={col}
            uiNum={cellAnswer.uiNum}
            answerContent={cellAnswer?.answerContent}
            userContent={userContent[key].content}
            isCorrect={userContent[key].isCorrect}
          />
        );
      }
      rows.push(
        <div key={`row-${row}`} className={styles.row}>
          {currentRow}
        </div>
      );
    }
    return rows;
  }, [answersByCell.grid, answersByCell.gridSize, userContent]);
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

      <div tabIndex={0} className={styles.crossword} onKeyDown={handleKeyDown}>
        {renderGrid()}
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
        <div>Solved: {solved}</div>
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
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: -50,
          width: '40vw',
          margin: '1em',
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid black',
        }}
      >
        <pre style={{ width: '50%' }}>
          Metadata by Cell
          {JSON.stringify(answersByCell, null, 2)}
        </pre>
        Metadata by Clue
        <pre>{JSON.stringify(answersByClue, null, 2)}</pre>
      </div>
    </div>
  );
}
