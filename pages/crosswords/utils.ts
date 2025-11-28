import {
  Answer,
  Clues,
  Crossword,
  ClueDirection,
  Grid,
  GridCoordinate,
  DataByClue,
  DataByClueAnswerContent,
  NavigationDirection,
  UserContent,
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

  let acrossAnswer;
  let downAnswer;
  let acrossAnswerKey;
  let downAnswerKey;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const key = rowColToKey(i, j);
      let answerContent;
      const isAcrossStart = clues.across[key];
      const isDownStart = clues.down[key];
      acrossAnswer = clues.across[key] ?? acrossAnswer;
      downAnswer = clues.down[key] ?? downAnswer;

      if (clues.across[key]) {
        acrossAnswerKey = key;
      }
      if (clues.down[key]) {
        downAnswerKey = key;
      }
      if (acrossAnswerKey) {
        const answerStartCol = keyToRowCol(acrossAnswerKey)[1];
        const offset = j - answerStartCol;
        answerContent = acrossAnswer.answer[offset];
      }
      grid[key] = {
        row: i,
        col: j,
        acrossAnswerStartKey: downAnswerKey,
        downAnswerStartKey: acrossAnswerKey,
        answerContent,
        uiNum: isAcrossStart
          ? acrossAnswer.number
          : isDownStart
          ? downAnswer.number
          : undefined,
      };
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

export function generateBlankGrid(gridSize: number): UserContent {
  const grid: UserContent = {};
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      grid[rowColToKey(i, j)] = { content: null, isCorrect: false };
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
  return solution.grid[rowColToKey(candidate.row, candidate.col)]
    ?.answerContent == null
    ? getNextCellManualNavigation(candidate, direction, solution)
    : candidate;
}

export function getNextCellAutoNavigation(
  currentCell: GridCoordinate,
  direction: ClueDirection,
  grid: Grid,
  userEntries: any,
  answersByClue: DataByClue,
  answersByCell: Crossword
): GridCoordinate {
  if (isGridComplete(userEntries)) return { row: 0, col: 0 };
  let nextCell = { ...currentCell };
  const currentCellKey = rowColToKey(currentCell.row, currentCell.col);

  console.log('Grid', grid);
  console.log('answers by clue', answersByClue);
  console.log('answers by cell', answersByCell);
  // If the answer is completely filled in, go to the next clue in direction we're currently going.
  // If it's incomplete, go to the next unfilled cell in the answer

  const newKey = rowColToKey(nextCell.row, nextCell.col);
  // TODO: if word is not complete, go to the first blank cell in the word.

  if (newKey == currentCellKey) return { row: 0, col: 0 }; // We've wrapped around to the start, puzzle is done!
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

export function isGridComplete(userEntries: UserContent): boolean {
  // TODO (maybe): don't brute force it.
  const anyMissing = Object.values(userEntries).some(
    (entry) => entry.content == null
  );
  return !anyMissing;
}

export function isCellCorrect(
  userContent: string,
  cellKey: string,
  answers: Grid
): boolean | null {
  return userContent == answers[cellKey].answerContent?.toUpperCase();
}

export function isGridCorrect(
  userEntries: UserContent,
  answers: Grid
): boolean {
  // TODO (maybe): don't brute force it.
  if (!isGridComplete(userEntries)) return false;
  return Object.keys(userEntries).every((key) => {
    if (!answers[key].answerContent) return true;
    // const result =
    //   userEntries[key]?.content?.toUpperCase() ==
    //   answers[key].content.toUpperCase();
    // if (!result) {
    //   console.log(
    //     'key:',
    //     key,
    //     'user entry:',
    //     userEntries[key],
    //     'correct answer:',
    //     answers[key].content
    //   );
    // }

    // TODO: use isCellCorrect
    return (
      userEntries[key]?.content?.toUpperCase() ==
      answers[key].answerContent.toUpperCase()
    );
  });
}
