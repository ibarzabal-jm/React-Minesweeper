import { useEffect, useState } from "react";
import "./App.css";
import { createBoard } from "./utils/createBoard";
import { Cell } from "./types/types";
import { revealCell } from "./utils/revealCell";

function App() {
  const [board, setBoard] = useState<Cell[][]>(createBoard(8, 8, 2));

  useEffect(() => {
    console.log(board);
  }, [board]);

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
              >
                {!cell.isOpen
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
