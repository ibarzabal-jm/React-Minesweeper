import { Board } from "../types/types";

export const revealAllCels = (board: Board): Board => {
  const newBoard = board.map((row) =>
    row.map((cell) => ({ ...cell, isOpen: true }))
  );
  return newBoard;
};
