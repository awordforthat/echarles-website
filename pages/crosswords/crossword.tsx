/* eslint-disable no-fallthrough */
/* eslint-disable no-redeclare */
import React from 'react';
import styles from './crossword.module.scss';
import { Cell } from './cell';
import { useAppDispatch, useAppSelector } from './hooks';
import { useAnswerChange } from './useAnswerChange';
import { getNextCell } from './utils';

export function Crossword() {
  const solution = useAppSelector((state) => state.solution);
  const selections = useAppSelector((state) => state.selection);
  const direction = useAppSelector((state) => state.selection.direction);
  const { updateAnswerInPlace, updateAnswerNewCell } = useAnswerChange();

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const currentCell = {
        row: selections.row ?? 0,
        col: selections.col ?? 0,
      };
      if (currentCell.row == null || currentCell.col == null) return;

      let nextCell = { row: selections.row, col: selections.col };
      switch (e.code) {
        case 'ArrowUp':
          nextCell = getNextCell(currentCell, 'up', solution.gridSize);
        case 'ArrowDown':
          nextCell = getNextCell(currentCell, 'down', solution.gridSize);
        case 'ArrowLeft':
          nextCell = getNextCell(currentCell, 'left', solution.gridSize);
        case 'ArrowRight':
          nextCell = getNextCell(currentCell, 'right', solution.gridSize);
          updateAnswerNewCell(nextCell);
          break;
        case 'Space':
          console.log(' ');
          updateAnswerInPlace(direction === 'across' ? 'down' : 'across');
          break;
      }
    },
    [
      direction,
      selections.col,
      selections.row,
      updateAnswerInPlace,
      updateAnswerNewCell,
    ]
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
