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
  rowColToKey,
} from './utils';
import { setSelectedCell } from './selectionSlice';
import { useDispatch } from 'react-redux';
import { NavigationDirection } from './types';
import { setSolution } from './solutionSlice';
import { hopskipjumpsolution } from './hopskipjump';
import { setCellContent } from './inputSlice';

export function Crossword() {
  const devSolution = useAppSelector((state) => state.solution.devSolution);
  const humanSolution = useAppSelector((state) => state.solution.humanSolution);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const userContent = useAppSelector((state) => state.userContent.grid);
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

      const nextCell = getNextCellManualNavigation(
        currentCell,
        navDirection,
        devSolution
      );

      dispatch(setSelectedCell(nextCell));
      updateAnswer({ cell: nextCell });
    },
    [
      direction,
      dispatch,
      selections.col,
      selections.row,
      devSolution,
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

      if (e.key.length === 1) {
        dispatch(
          setCellContent({
            cellKey: `${selections.row},${selections.col}`,
            content: e.key,
          })
        );
        if (!selections.answer) return;
        dispatch(
          setSelectedCell(
            getNextCellAutoNavigation(currentCell, direction, humanSolution, 0)
          )
        );

        return;
      }

      switch (e.code) {
        case 'Space':
          dispatch(setSelectedCell(currentCell));
          toggleDirection();
          break;
      }
    },
    [
      direction,
      dispatch,
      handleArrowKeys,
      selections.answer,
      selections.col,
      selections.row,
      devSolution,
      toggleDirection,
    ]
  );

  const renderGrid = React.useCallback(() => {
    const rows = [];
    for (let row = 0; row < devSolution.gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < devSolution.gridSize; col++) {
        const key = rowColToKey(row, col);
        const cell = devSolution.grid[key];

        if (cell?.content == null) {
          currentRow.push(
            <Cell key={key} row={row} col={col} userContent={null} />
          );
          continue;
        }

        currentRow.push(
          <Cell
            key={key}
            row={row}
            col={col}
            number={cell.number}
            content={cell?.content}
            userContent={userContent[key]}
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
  }, [devSolution.grid, devSolution.gridSize, userContent]);

  return (
    <div tabIndex={0} className={styles.crossword} onKeyDown={handleKeyDown}>
      {renderGrid()}
      <div>{JSON.stringify(selections)}</div>
    </div>
  );
}
