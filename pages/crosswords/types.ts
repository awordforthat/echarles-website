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
};

export type DataByClueAnswerContent = {
  number?: number;
  clue: string;
  answer: string;
  key: string;
};

export type DataByClue = {
  across: DataByClueAnswerContent[];
  down: DataByClueAnswerContent[];
};

export type GridCoordinate = {
  row: number;
  col: number;
};

export type ICell = GridCoordinate & {
  content?: string; // undefined for black cells
  number?: number;
  acrossPrev?: string;
  acrossNext?: string;
  downPrev?: string;
  downNext?: string;
};

export type ClueDirection = 'across' | 'down';
export type NavigationDirection = 'up' | 'down' | 'left' | 'right';
