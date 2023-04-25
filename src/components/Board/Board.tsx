import { useBoard } from "../../hooks/useBoard";
import Cell from "../Cell/Cell";

interface IBoardProps {
  columns: number;
  rows: number;
  mines: number;
}

const Board = ({ columns = 8, rows = 8, mines = 5 }: IBoardProps) => {
  const { board, handleRevealCell, handleUpdateFlag } = useBoard(
    columns,
    rows,
    mines
  );
  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell) => (
            <Cell
              key={`${cell.column}y+${cell.row}x`}
              details={cell}
              addFlag={handleUpdateFlag}
              revealCell={handleRevealCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
