import { Board } from "../types/types";

interface RevealedBoard {
  board: Board;
  flagsRemoved: number;
  cellsRevealed: number;
}

export const revealCell = (
  board: Board,
  row: number,
  column: number
): RevealedBoard => {
  let cellsRevealed = 0;
  let flagsRemoved = 0;

  if (board[row][column].isOpen) {
    return { board, flagsRemoved, cellsRevealed };
  }

  if (board[row][column].hasMine) {
    return { board, flagsRemoved, cellsRevealed };
  }

  const newBoard = board.map((row) => [...row]);
  newBoard[row][column].isOpen = true;
  cellsRevealed++;

  if (newBoard[row][column].hasFlag) {
    newBoard[row][column].hasFlag = false;
    flagsRemoved++;
  }

  if (board[row][column].nearMines === 0) {
    if (board[row - 1]) {
      const revealed = revealCell(newBoard, row - 1, column);
      newBoard[row - 1][column] = revealed.board[row - 1][column];
      flagsRemoved += revealed.flagsRemoved;
      cellsRevealed += revealed.cellsRevealed;
    }
    if (board[row + 1]) {
      const revealed = revealCell(newBoard, row + 1, column);
      newBoard[row + 1][column] = revealed.board[row + 1][column];
      flagsRemoved += revealed.flagsRemoved;
      cellsRevealed += revealed.cellsRevealed;
    }
    if (board[row][column - 1]) {
      const revealed = revealCell(newBoard, row, column - 1);
      newBoard[row][column - 1] = revealed.board[row][column - 1];
      flagsRemoved += revealed.flagsRemoved;
      cellsRevealed += revealed.cellsRevealed;
    }
    if (board[row][column + 1]) {
      const revealed = revealCell(newBoard, row, column + 1);
      newBoard[row][column + 1] = revealed.board[row][column + 1];
      flagsRemoved += revealed.flagsRemoved;
      cellsRevealed += revealed.cellsRevealed;
    }
  }

  return { board: newBoard, flagsRemoved, cellsRevealed };
};
