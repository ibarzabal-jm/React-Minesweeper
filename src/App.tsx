import { useEffect, useState } from "react";
import "./App.css";
import { createBoard } from "./utils/createBoard";
import { Board, GameStatus } from "./types/types";
import { revealCell } from "./utils/revealCell";
import { updateFlag } from "./utils/updateFlag";
import Cell from "./components/Cell/Cell";
import { revealAllCels } from "./utils/revealAllCels";

function App() {
  const [board, setBoard] = useState<Board>([]);
  const [availableFlags, setAvailableFlags] = useState<number>(0);
  const [revealedCells, setRevealedCells] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  useEffect(() => {
    const newBoard = createBoard(8, 8, 3);
    setBoard(newBoard.board);
    setAvailableFlags(3);
    setRevealedCells(0);
    setGameStatus("playing");
  }, []);

  useEffect(() => {
    if (revealedCells === 0) return;
    if (revealedCells === board.length * board[0].length - 3) {
      setGameStatus("win");
      const newBoard = revealAllCels(board);
      return setBoard(newBoard);
    }
  }, [revealedCells, board]);

  const handleUpdateFlag = (row: number, column: number) => {
    const cell = board[row][column];
    if ((availableFlags === 0 && !cell.hasFlag) || cell.isOpen) return;
    setAvailableFlags((prev) => (cell.hasFlag ? prev - 1 : prev + 1));
    const newBoard = updateFlag(board, row, column);
    setBoard(newBoard);
  };

  const handleReveal = (row: number, column: number) => {
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

  return (
    <div className="App">
      <div className="minesweeper">
        <h1>Minesweeper </h1>

        <div className="game-status">
          <h3>Game Status: {gameStatus}</h3>
        </div>

        <div className="flags">
          <h3>Flags: {availableFlags}</h3>
        </div>

        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell) => (
              <Cell
                key={`${cell.column}y+${cell.row}x`}
                details={cell}
                addFlag={handleUpdateFlag}
                revealCell={handleReveal}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
