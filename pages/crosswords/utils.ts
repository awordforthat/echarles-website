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

      if (acrossAnswerKey) {
        const answerStartCol = keyToRowCol(acrossAnswerKey)[1];
        const offset = j - answerStartCol;
        answerContent = acrossAnswer.answer[offset];
      }
      grid[key] = {
        row: i,
        col: j,
        acrossAnswerStartKey: acrossAnswerKey,
        answerContent,
        uiNum: isAcrossStart
          ? acrossAnswer.number
          : isDownStart
          ? downAnswer.number
          : undefined,
      };
    }
  }

  // TODO: remove double iteration
  let downAnswerKey;
  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize; i++) {
      const key = rowColToKey(i, j);
      let answerContent;
      downAnswer = clues.down[key] ?? downAnswer;

      if (clues.down[key]) {
        downAnswerKey = key;
      }

      if (downAnswerKey) {
        const answerStartRow = keyToRowCol(downAnswerKey)[0];
        const offset = i - answerStartRow;
        answerContent = downAnswer.answer[offset];
      }

      grid[key].downAnswerStartKey = downAnswerKey;
      grid[key].answerContent = answerContent;
    }
  }

  return grid;
}

export function generateDataByClue(crossword: Crossword) {
  const result: DataByClue = {
    across: [],
    down: [],
  };
  const acrossArray = [...Object.entries(crossword.clues.across)];
  const downArray = [...Object.entries(crossword.clues.down)];

  for (let i = 0; i < acrossArray.length; i++) {
    const [key, answer] = acrossArray[i];
    const nextIndex = (i + 1) % acrossArray.length;
    const prevIndex = i > 0 ? i - 1 : acrossArray.length - 1;
    result.across.push({
      number: answer.number,
      clue: answer.clue,
      answer: answer.answer,
      key,
      nextAnswerKey: acrossArray[nextIndex][0],
      prevAnswerKey: acrossArray[prevIndex][0],
    });
  }

  for (let j = 0; j < downArray.length; j++) {
    const [key, answer] = downArray[j];
    const nextIndex = (j + 1) % downArray.length;
    const prevIndex = j > 0 ? j - 1 : downArray.length - 1;
    result.down.push({
      number: answer.number,
      clue: answer.clue,
      answer: answer.answer,
      key,
      nextAnswerKey: downArray[nextIndex][0],
      prevAnswerKey: downArray[prevIndex][0],
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
  currentCellRowCol: GridCoordinate,
  direction: ClueDirection,
  userEntries: any,
  crosswordDef: Crossword,
  answersByClue: DataByClue
): GridCoordinate {
  let nextCell = { ...currentCellRowCol };
  const currentCellKey = rowColToKey(
    currentCellRowCol.row,
    currentCellRowCol.col
  );
  const cell = crosswordDef.grid[currentCellKey];
  const answerStartKey =
    direction == 'across' ? cell.acrossAnswerStartKey : cell.downAnswerStartKey;
  if (answerStartKey) {
    const [answerStartRow, answerStartCol] = keyToRowCol(answerStartKey);
    const answer = crosswordDef.clues[direction][answerStartKey]?.answer;

    const currentIndex =
      direction == 'across'
        ? currentCellRowCol.col - answerStartCol
        : currentCellRowCol.row - answerStartRow;
    for (let i = (currentIndex + 1) % answer.length; i < answer.length; i++) {
      const key =
        direction == 'across'
          ? rowColToKey(answerStartRow, answerStartCol + i)
          : rowColToKey(answerStartRow + i, answerStartCol);
      if (userEntries[key].content) continue;
      const [resultRow, resultCol] = keyToRowCol(key);
      return { row: resultRow, col: resultCol };
    }

    let currentDirClues = answersByClue[direction];

    // Go to the next clue in this direction. We've pre-calculated this.
    for (let i = 0; i < currentDirClues.length; i++) {
      if (currentDirClues[i].key == answerStartKey) {
        const nextAnswerKey =
          currentDirClues[(i + 1) % currentDirClues.length].key;
        const [nextRow, nextCol] = keyToRowCol(nextAnswerKey);

        if (!userEntries[nextAnswerKey].content)
          return { row: nextRow, col: nextCol };
        return getNextCellAutoNavigation(
          { row: nextRow, col: nextCol },
          direction,
          userEntries,
          crosswordDef,
          answersByClue
        );
      }
    }

    return { row: 0, col: 0 };
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
  return (
    userContent.toUpperCase() == answers[cellKey].answerContent?.toUpperCase()
  );
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
