import React from 'react';
import styles from './crossword.module.scss';
import { Cell } from './cell';
import { useAppSelector } from './hooks';

export function Crossword() {
  const solution = useAppSelector((state) => state.solution);
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

  return <div className={styles.crossword}>{renderGrid()}</div>;
}
