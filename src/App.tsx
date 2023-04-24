import { useEffect, useState } from "react";
import "./App.css";
import { createBoard } from "./utils/createBoard";
import { Board } from "./types/types";
import { revealCell } from "./utils/revealCell";
import { updateFlag } from "./utils/updateFlag";
import Cell from "./components/Cell/Cell";

function App() {
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    const newBoard = createBoard(5, 5, 5);
    setBoard(newBoard.board);
  }, []);

  const handleUpdateFlag = (row: number, column: number) => {
    if (board[column][row].isOpen) return;
    const newBoard = updateFlag(board, row, column);
    setBoard(newBoard);
  };

  const handleReveal = (row: number, column: number) => {
    if (board[column][row].hasFlag) return;
    const newBoard = revealCell(board, row, column);
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <div className="minesweeper">
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
