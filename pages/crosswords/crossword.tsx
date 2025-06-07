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
import { useDispatch } from 'react-redux';
import { NavigationDirection } from './types';
import { setDataByCell } from './solutionSlice';
import { hopskipjumpsolution } from './hopskipjump';
import { setCellContent } from './userInputSlice';
import { store } from './store';

export function Crossword() {
  const dataByCell = useAppSelector((state) => state.solution.dataByCell);
  const dataByClue = useAppSelector((state) => state.solution.dataByClue);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const userContent = useAppSelector((state) => state.userContent.grid);
  const dispatch = useDispatch();
  const { updateAnswer, toggleDirection } = useSelectionUpdates();

  React.useEffect(() => {
    dispatch(setDataByCell(hopskipjumpsolution));
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
        dataByCell
      );

      updateAnswer({ cell: nextCell });
    },
    [
      direction,
      selections.col,
      selections.row,
      dataByCell,
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
          })
        );
        // Accessing the store directly here ensures that we have
        // the update that was just made, which is used in the auto navigation call.
        const updatedUserContent = store.getState().userContent.grid;
        if (!selections.answer) return;
        const nextCellAuto = getNextCellAutoNavigation(
          currentCell,
          direction,
          dataByCell.grid,
          updatedUserContent
        );
        updateAnswer({ cell: nextCellAuto });
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          updateAnswer({ cell: currentCell });
          toggleDirection();
          break;
        case 'Backspace':
          dispatch(
            setCellContent({
              cellKey: `${selections.row},${selections.col}`,
              content: '',
            })
          );
          const nextCell = getNextCellManualNavigation(
            currentCell,
            direction == 'across' ? 'left' : 'up',
            dataByCell
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
      direction,
      dataByCell,
      updateAnswer,
      toggleDirection,
    ]
  );

  const renderGrid = React.useCallback(() => {
    const rows = [];
    for (let row = 0; row < dataByCell.gridSize; row++) {
      const currentRow = [];
      for (let col = 0; col < dataByCell.gridSize; col++) {
        const key = rowColToKey(row, col);
        const cell = dataByCell.grid[key];

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
  }, [dataByCell.grid, dataByCell.gridSize, userContent]);

  return (
    <>
      <div tabIndex={0} className={styles.crossword} onKeyDown={handleKeyDown}>
        {renderGrid()}
        <div>Answer: {JSON.stringify(selections.answer)}</div>
        <div>Answer num: {JSON.stringify(selections.answerNum)}</div>
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
          {JSON.stringify(dataByCell, null, 2)}
        </pre>
        Metadata by Clue
        <pre>{JSON.stringify(dataByClue, null, 2)}</pre>
      </div>
    </>
  );
}
