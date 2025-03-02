type Answer = {
  clue: string;
  answer: string;
  linkedAnswers?: { key: string; direction: string }[];
  number?: number;
};

type Grid = Map<string, ICell>;
export type Clues = {
  across: Map<string, Answer>;
  down: Map<string, Answer>;
};

export type Crossword = {
  gridSize: number;
  grid: Grid;
  clues: Clues;
};

export interface ICell {
  row: number;
  col: number;
  userContent?: string;
  answerContent?: string; // undefined for black cells
  number?: number;
}

export function DEBUG_ONLY_generateDownGrid(
  clues: Clues,
  gridSize: number
): Grid {
  const grid: Grid = new Map();
  if (!clues.down) return new Map();

  for (const [rowCol, answer] of Array.from(clues.down.entries())) {
    const [row, col] = rowCol.split(',').map((x) => parseInt(x));
    for (let i = 0; i < answer.answer.length; i++) {
      const key = `${row + i},${col}`;
      grid.set(key, {
        row: row + i,
        col,
        answerContent: answer.answer[i],
      });
    }
  }

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid.get(`${i},${j}`);
      if (cell) continue;
      grid.set(`${i},${j}`, {
        row: i,
        col: j,
      });
    }
  }
  return grid;
}

export function generateGrid(clues: Clues, gridSize: number): Grid {
  const grid: Grid = new Map();
  if (!clues.across) return new Map();

  for (const [rowCol, answer] of Array.from(clues.across.entries())) {
    const [row, col] = rowCol.split(',').map((x) => parseInt(x));
    for (let i = 0; i < answer.answer.length; i++) {
      const key = `${row},${col + i}`;
      grid.set(key, {
        row,
        col: col + i,
        answerContent: answer.answer[i],
        number: i == 0 ? answer.number : undefined,
      });
    }
  }

  // TODO:  remove double iteration.
  // Fill in black cells and missing numbers.
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = grid.get(`${i},${j}`);
      if (cell) {
        const acrossAnswer = clues.across.get(`${i},${j}`);
        const downAnswer = clues.down.get(`${i},${j}`);
        if (cell.number == null)
          cell.number = acrossAnswer?.number ?? downAnswer?.number;
        continue;
      }
      grid.set(`${i},${j}`, {
        row: i,
        col: j,
      });
    }
  }
  return grid;
}
