export type Answer = {
  clue: string;
  answer: string;
  linkedAnswers?: { key: string; direction: string }[];
  number: number;
};

export type Grid = Record<string, ICell>;

export type Clues = {
  across: Record<string, Answer>;
  down: Record<string, Answer>;
};

export type Crossword = {
  gridSize: number;
  grid: Grid;
  clues: Clues;
  index: number;
};

export type DataByClueAnswerContent = {
  number?: number;
  clue: string;
  answer: string;
  key: string;
};

export type UserContent = Record<
  string,
  {
    content: string | null;
    isCorrect: boolean | null;
  }
>;

export type DataByClue = {
  across: DataByClueAnswerContent[];
  down: DataByClueAnswerContent[];
};

export type GridCoordinate = {
  row: number;
  col: number;
};

export type ICell = GridCoordinate & {
  answerContent?: string; // undefined for black cells
  acrossAnswerNum?: number;
  downAnswerNum?: number;
  acrossAnswerStartKey?: string;
  downAnswerStartKey?: string;
  uiNum?: number;
};

export type ClueDirection = 'across' | 'down';
export type NavigationDirection = 'up' | 'down' | 'left' | 'right';
