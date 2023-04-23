import { Cell } from "../types/types";

export const revealCell = (
  board: Cell[][],
  row: number,
  column: number
): Cell[][] => {
  if (board[row][column].isOpen) {
    return board;
  }

  if (board[row][column].hasMine) {
    return board;
  }

  const newBoard = board.map((row) => [...row]);
  newBoard[row][column].isOpen = true;

  if (board[row][column].nearMines === 0) {
    if (board[row - 1]) {
      newBoard[row - 1][column] = revealCell(newBoard, row - 1, column)[
        row - 1
      ][column];
    }
    if (board[row + 1]) {
      newBoard[row + 1][column] = revealCell(newBoard, row + 1, column)[
        row + 1
      ][column];
    }
    if (board[row][column - 1]) {
      newBoard[row][column - 1] = revealCell(newBoard, row, column - 1)[row][
        column - 1
      ];
    }
    if (board[row][column + 1]) {
      newBoard[row][column + 1] = revealCell(newBoard, row, column + 1)[row][
        column + 1
      ];
    }
  }

  return newBoard;
};
