/* eslint-disable no-fallthrough */
/* eslint-disable no-redeclare */
import React from 'react';
import styles from './crossword.module.scss';
import { Cell } from './cell';
import { useAppSelector } from './hooks';
import { useSelectionUpdates } from './useSelectionUpdates';
import { getNextCell } from './utils';
import { setSelectedCell } from './selectionSlice';
import { useDispatch } from 'react-redux';
import { NavigationDirection } from './types';
import { setSolution } from './solutionSlice';
import { hopskipjumpsolution } from './hopskipjump';

export function Crossword() {
  const solution = useAppSelector((state) => state.solution);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const dispatch = useDispatch();
  const { updateAnswer, toggleDirection } = useSelectionUpdates();

  React.useEffect(() => {
    dispatch(setSolution(hopskipjumpsolution));
  }, [dispatch]);

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

      const nextCell = getNextCell(
        currentCell,
        navDirection,
        solution.gridSize
      );
      dispatch(setSelectedCell(nextCell));
      updateAnswer({ cell: nextCell });
      console.log(JSON.stringify(solution));
    },
    [
      direction,
      dispatch,
      selections.col,
      selections.row,
      solution,
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
        handleArrowKeys(e);
        return;
      }

      switch (e.code) {
        case 'Space':
          dispatch(setSelectedCell(currentCell));
          toggleDirection();
          break;
      }
    },
    [dispatch, handleArrowKeys, selections.col, selections.row, toggleDirection]
  );

  const renderGrid = React.useCallback(() => {
    const rows = [];
    for (let row = 0; row < solution.gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < solution.gridSize; col++) {
        const key = `${row},${col}`;
        const cell = solution.grid.get(key);

        if (cell?.answerContent == null) {
          currentRow.push(<Cell key={key} row={row} col={col} />);
          continue;
        }
        currentRow.push(
          <Cell
            key={key}
            row={row}
            col={col}
            number={cell.number}
            answerContent={cell?.answerContent}
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
  }, [solution.grid, solution.gridSize]);

  return (
    <div tabIndex={0} className={styles.crossword} onKeyDown={handleKeyDown}>
      {renderGrid()}
      <div>{JSON.stringify(selections)}</div>
    </div>
  );
}
