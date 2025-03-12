import {
  Answer,
  Clues,
  Crossword,
  Direction,
  Grid,
  GridCoordinate,
  HumanSolution,
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
  return grid;
}
export function generateHumanSolution(crossword: Crossword) {
  const result: HumanSolution = {
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
    row: (currentCell.row + vec.row) % gridSize,
    col: (currentCell.col + vec.col) % gridSize,
  };
  if (
    solution.grid[rowColToKey(candidate.row, candidate.col)]?.content == null
  ) {
    return getNextCellManualNavigation(candidate, direction, solution);
  }
  return candidate;
}

export function getNextCellAutoNavigation(
  currentCell: GridCoordinate,
  direction: Direction,
  solution: HumanSolution,
  currentAnswerIndex: number
): GridCoordinate {
  const clues = solution[direction];
  console.log(clues[currentAnswerIndex]);

  return currentCell;
}
