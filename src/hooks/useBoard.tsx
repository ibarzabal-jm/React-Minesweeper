import { useState, useEffect, useCallback } from "react";
import { Board, GameStatus } from "../types/types";
import { createBoard } from "../utils/createBoard";
import { updateFlag } from "../utils/updateFlag";
import { revealAllCels } from "../utils/revealAllCels";
import { revealCell } from "../utils/revealCell";

export const useBoard = (row: number, column: number, mines: number) => {
  const [board, setBoard] = useState<Board>([]);
  const [availableFlags, setAvailableFlags] = useState<number>(0);
  const [revealedCells, setRevealedCells] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const startGame = useCallback(() => {
    const newBoard = createBoard(row, column, mines);
    setBoard(newBoard.board);
    setAvailableFlags(mines);
    setRevealedCells(0);
    setGameStatus("playing");
  }, [column, mines, row]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (revealedCells === 0) return;
    if (revealedCells === column * row - mines) {
      setGameStatus("win");
      const newBoard = revealAllCels(board);
      return setBoard(newBoard);
    }
  }, [board, column, mines, revealedCells, row]);

  const handleUpdateFlag = (row: number, column: number) => {
    const cell = board[row][column];
    if ((availableFlags === 0 && !cell.hasFlag) || cell.isOpen) return;
    setAvailableFlags((prev) => (cell.hasFlag ? prev - 1 : prev + 1));
    const newBoard = updateFlag(board, row, column);
    setBoard(newBoard);
  };

  const handleRevealCell = (row: number, column: number) => {
    if (board[row][column].hasFlag) return;
    if (board[row][column].hasMine) {
      setGameStatus("lose");
      const newBoard = revealAllCels(board);
      return setBoard(newBoard);
    }
    const newBoard = revealCell(board, row, column);
    setAvailableFlags((prev) => prev + newBoard.flagsRemoved);
    setRevealedCells((prev) => prev + newBoard.cellsRevealed);
    setBoard(newBoard.board);
  };

  const handleRestartGame = () => {
    startGame();
  };

  return {
    board,
    gameStatus,
    availableFlags,
    handleUpdateFlag,
    handleRestartGame,
    handleRevealCell,
  };
};
