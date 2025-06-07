import { hopskipjumpGridSize } from './hopskipjump';
import {
  Answer,
  Clues,
  Crossword,
  ClueDirection,
  Grid,
  GridCoordinate,
  DataByClue,
  DataByClueAnswerContent,
  ICell,
  NavigationDirection,
} from './types';

export function keyToRowCol(rowCol: string): Array<number> {
  return rowCol.split(',').map((x) => parseInt(x));
}

export function rowColToKey(row: number, col: number): string {
  return `${row},${col}`;
}

export function DEBUG_ONLY_generateDownGrid(
  clues: Clues,
  gridSize: number
): Grid {
  const grid: Grid = {};
  if (!clues.down) return {};

  for (const [rowCol, answer] of Object.entries(clues.down)) {
    const [row, col] = keyToRowCol(rowCol);
    for (let i = 0; i < answer.answer.length; i++) {
      const key = rowColToKey(row + i, col);
      grid[key] = {
        row: row + i,
        col,
        content: answer.answer[i],
      };
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[`${i},${j}`];
      if (cell) continue;
      grid[`${i},${j}`] = {
        row: i,
        col: j,
      };
    }
  }
  return grid;
}

export function generateGrid(clues: Clues, gridSize: number): Grid {
  const grid: Grid = {};
  if (!clues.across) return {};
  for (const [rowCol, answer] of Object.entries(clues.across)) {
    const [row, col] = keyToRowCol(rowCol);
    for (let i = 0; i < answer.answer.length; i++) {
      const key = rowColToKey(row, col + i);
      grid[key] = {
        row,
        col: col + i,
        content: answer.answer[i],
        number: i == 0 ? answer.number : undefined,
      };
    }
  }

  // TODO:  remove double iteration.
  // Fill in black cells and missing numbers.
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[`${i},${j}`];
      const answerKey = rowColToKey(i, j);
      if (cell) {
        const acrossAnswer = clues.across[answerKey];
        const downAnswer = clues.down[answerKey];
        if (cell.number == null)
          cell.number = acrossAnswer?.number ?? downAnswer?.number;
        continue;
      }
      grid[answerKey] = {
        row: i,
        col: j,
      };
    }
  }

  // TODO: remove third iteration :(
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // For each cell, calculate the closest cell in the row and column
      // that isn't the edge of the puzzle and is not black.
      const cell: ICell = grid[`${i},${j}`];
      if (i > 0) {
        let prevRow = i;
        for (let k = i; k >= 0; k--) {
          console.log(grid[`${k},${j}`]);
          if (!grid[`${k},${j}`]) continue;
          prevRow = k;
          break;
        }
        cell.downPrev = rowColToKey(prevRow, j);
        console.log('cell', cell, 'prev is ', cell.downPrev);
      }
      if (i < gridSize - 1) {
        let nextRow = i;
        for (let k = i; k < gridSize; k++) {
          if (!grid[`${i},${k}`]) continue;
          nextRow = k;
          break;
        }
        cell.downNext = rowColToKey(nextRow, j);
      }
      if (j > 0) {
        let prevCol = j;
        for (let k = j; k >= 0; k--) {
          if (!grid[`${i},${k}`]) continue;
          prevCol = k;
          break;
        }
        cell.acrossPrev = rowColToKey(i, prevCol);
      }
      if (j < gridSize - 1) {
        let nextCol = j;
        for (let k = j; k < gridSize; k++) {
          if (!grid[`${i},${k}`]) continue;
          nextCol = k;
          break;
        }
        cell.acrossNext = rowColToKey(i, nextCol);
      }
    }
  }
  return grid;
}

export function generateDataByClue(crossword: Crossword) {
  const result: DataByClue = {
    across: [],
    down: [],
  };
  for (const [key, answer] of Object.entries(crossword.clues.across)) {
    result.across.push({
      number: answer.number,
      clue: answer.clue,
      answer: answer.answer,
      key,
    });
  }
  for (const [key, answer] of Object.entries(crossword.clues.down)) {
    result.down.push({
      number: answer.number,
      clue: answer.clue,
      answer: answer.answer,
      key,
    });
  }
  return result;
}

export function generateBlankGrid(
  gridSize: number
): Record<string, string | null> {
  const grid: Record<string, string | null> = {};
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[rowColToKey(i, j)] = null;
    }
  }
  return grid;
}

export function getContainingAnswer(
  row: number,
  col: number,
  direction: ClueDirection,
  clues: Clues
): { answer: Answer; key: string; num: number } | null {
  const answers = clues[direction];
  for (const [key, answer] of Object.entries(answers)) {
    if (answerContainsCell(key, answer, row, col, direction)) {
      return { answer, key, num: answer.number };
    }
  }
  return null;
}

export function answerContainsCell(
  key: string,
  answer: Answer,
  row: number,
  col: number,
  direction: ClueDirection
): boolean {
  const [answerRow, answerCol] = keyToRowCol(key);
  const lineNum = direction == 'across' ? answerCol : answerRow;
  const wordEnd = lineNum + answer.answer.length;
  if (direction == 'across') {
    if (row == answerRow && col >= lineNum && col < wordEnd) return true;
  } else if (col == answerCol && row >= lineNum && row < wordEnd) return true;
  return false;
}

export function getNextCellManualNavigation(
  currentCell: GridCoordinate,
  direction: NavigationDirection,
  solution: Crossword
): GridCoordinate {
  let vec = { row: 0, col: 0 };
  switch (direction) {
    case 'up':
      vec = { row: -1, col: 0 };
      break;
    case 'down':
      vec = { row: 1, col: 0 };
      break;
    case 'left':
      vec = { row: 0, col: -1 };
      break;
    case 'right':
      vec = { row: 0, col: 1 };
      break;
    default:
      break;
  }
  const gridSize = solution.gridSize;
  const candidate = {
    row: Math.max((currentCell.row + vec.row) % gridSize, 0),
    col: Math.max((currentCell.col + vec.col) % gridSize, 0),
  };
  // Return immediately if at grid start
  // TODO: wrap at left and top edges
  if (candidate.row == 0 && candidate.col == 0) return candidate;

  // Recursively find next valid cell if current cell is empty
  return solution.grid[rowColToKey(candidate.row, candidate.col)]?.content ==
    null
    ? getNextCellManualNavigation(candidate, direction, solution)
    : candidate;
}

export function getNextCellAutoNavigation(
  currentCell: GridCoordinate,
  direction: ClueDirection,
  grid: Grid,
  userContent: Record<string, string | null>
): GridCoordinate {
  const advanceVector = direction == 'across' ? [0, 1] : [1, 0];
  let nextCell = currentCell;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    nextCell = {
      row: nextCell.row + advanceVector[0],
      col: nextCell.col + advanceVector[1],
    };

    if (nextCell.col >= hopskipjumpGridSize) {
      nextCell.col = 0;
      nextCell.row += 1;
    }

    if (nextCell.row >= hopskipjumpGridSize) {
      nextCell.row = 0;
      nextCell.col += 1;
    }

    if (
      nextCell.row >= hopskipjumpGridSize ||
      nextCell.row >= hopskipjumpGridSize
    ) {
      nextCell = { row: 0, col: 0 };
    }

    const newKey = rowColToKey(nextCell.row, nextCell.col);

    if (!grid[newKey].content) continue; // Cell is black.
    if (userContent[newKey]) continue; // User already entered something.
    break;
  }
  return nextCell;
}

export function getAnswerStartIndexFromNum(
  clues: DataByClueAnswerContent[],
  answerNum: number,
  direction: ClueDirection
) {
  const clueIndex = Object.values(clues).findIndex((c) => {
    return c.number === answerNum;
  });
  if (clueIndex == -1) return 0;
  const ansStartCell = keyToRowCol(clues[clueIndex].key);
  return ansStartCell[direction == 'across' ? 1 : 0];
}
