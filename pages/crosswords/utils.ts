import {
  Answer,
  Clues,
  Direction,
  Grid,
  GridCoordinate,
  NavigationDirection,
} from './types';

export function DEBUG_ONLY_generateDownGrid(
  clues: Clues,
  gridSize: number
): Grid {
  const grid: Grid = {};
  if (!clues.down) return {};

  for (const [rowCol, answer] of Object.entries(clues.down)) {
    const [row, col] = rowCol.split(',').map((x) => parseInt(x));
    for (let i = 0; i < answer.answer.length; i++) {
      const key = `${row + i},${col}`;
      grid[key] = {
        row: row + i,
        col,
        answerContent: answer.answer[i],
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

  console.log(clues);
  for (const [rowCol, answer] of Object.entries(clues.across)) {
    const [row, col] = rowCol.split(',').map((x) => parseInt(x));
    for (let i = 0; i < answer.answer.length; i++) {
      const key = `${row},${col + i}`;
      grid[key] = {
        row,
        col: col + i,
        answerContent: answer.answer[i],
        number: i == 0 ? answer.number : undefined,
      };
    }
  }

  // TODO:  remove double iteration.
  // Fill in black cells and missing numbers.
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid[`${i},${j}`];
      if (cell) {
        const acrossAnswer = clues.across[`${i},${j}`];
        const downAnswer = clues.down[`${i},${j}`];
        if (cell.number == null)
          cell.number = acrossAnswer?.number ?? downAnswer?.number;
        continue;
      }
      grid[`${i},${j}`] = {
        row: i,
        col: j,
      };
    }
  }
  console.log(grid);
  return grid;
}

export function getContainingAnswer(
  row: number,
  col: number,
  direction: Direction,
  clues: Clues
): { answer: Answer; key: string } | null {
  const answers = clues[direction];
  for (const [key, answer] of Object.entries(answers)) {
    if (answerContainsCell(key, answer, row, col, direction)) {
      return { answer, key };
    }
  }
  return null;
}

export function answerContainsCell(
  key: string,
  answer: Answer,
  row: number,
  col: number,
  direction: Direction
): boolean {
  const [answerRow, answerCol] = key.split(',').map((x) => parseInt(x));
  const lineNum = direction == 'across' ? answerCol : answerRow;
  const wordEnd = lineNum + answer.answer.length;
  if (direction == 'across') {
    if (row == answerRow && col >= lineNum && col < wordEnd) return true;
  } else if (col == answerCol && row >= lineNum && row < wordEnd) return true;
  return false;
}

export function getNextCellWSolution(
  currentCell: GridCoordinate,
  direction: NavigationDirection,
  gridSize: number,
  solution: Grid
): GridCoordinate {
  return {
    row: (currentCell.row + 1) % gridSize,
    col: (currentCell.col + 1) % gridSize,
  };
}

export function getNextCell(
  currentCell: GridCoordinate,
  direction: NavigationDirection,
  gridSize: number
) {
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
  return {
    row: (currentCell.row + vec.row) % gridSize,
    col: (currentCell.col + vec.col) % gridSize,
  };
}
