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
    const availableDirections = [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1],
    ];

    availableDirections.forEach((direction) => {
      const [rowDirection, columnDirection] = direction;

      if (
        rowDirection >= 0 &&
        rowDirection < board.length &&
        columnDirection >= 0 &&
        columnDirection < board[0].length
      ) {
        if (!newBoard[rowDirection][columnDirection].isOpen) {
          const revealedBoard = revealCell(
            newBoard,
            rowDirection,
            columnDirection
          );
          newBoard[rowDirection][columnDirection] =
            revealedBoard.board[rowDirection][columnDirection];
          flagsRemoved += revealedBoard.flagsRemoved;
          cellsRevealed += revealedBoard.cellsRevealed;
        }
      }
    });
  }

  return { board: newBoard, flagsRemoved, cellsRevealed };
};
