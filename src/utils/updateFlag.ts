import { Board } from "../types/types";

export const updateFlag = (
  board: Board,
  row: number,
  column: number
): Board => {
  const newBoard = board.map((row) => [...row]);
  newBoard[row][column].hasFlag = !newBoard[row][column].hasFlag;
  return newBoard;
};
