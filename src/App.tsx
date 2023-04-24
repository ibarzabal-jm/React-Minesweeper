import { useEffect, useState } from "react";
import "./App.css";
import { createBoard } from "./utils/createBoard";
import { Board, MinesMap } from "./types/types";
import { revealCell } from "./utils/revealCell";
import { updateFlag } from "./utils/updateFlag";

function App() {
  const [board, setBoard] = useState<Board>([]);
  const [mines, setMines] = useState<MinesMap>([]);

  useEffect(() => {
    const newBoard = createBoard(5, 5, 5);
    setBoard(newBoard.board);
    setMines(newBoard.minesLocations);
  }, []);

  const handleUpdateFlag = (x: number, y: number) => {
    if (board[x][y].isOpen) return;
    const newBoard = updateFlag(board, x, y);
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <div className="minesweeper">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="cell"
                onClick={() => {
                  const newBoard = revealCell(board, i, j);
                  setBoard(newBoard);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  const newBoard = updateFlag(board, i, j);
                  setBoard(newBoard);
                }}
              >
                {cell.hasFlag
                  ? "Flag"
                  : !cell.isOpen
                  ? "-"
                  : cell.hasMine
                  ? "X"
                  : cell.nearMines
                  ? cell.nearMines
                  : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
