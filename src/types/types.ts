export interface Cell {
  isOpen: boolean;
  hasMine: boolean;
  hasFlag: boolean;
  nearMines: number;
  row: number;
  column: number;
}

export interface Board {
  cells: Cell[][];
}
