import { Board as IBoard } from "../../types/types";
import Cell from "../Cell/Cell";

interface IBoardProps {
  table: IBoard;
  revealCell: (row: number, column: number) => void;
  addFlag: (row: number, column: number) => void;
}

const Board = ({ table, addFlag, revealCell }: IBoardProps) => {
  return (
    <div className="board">
      {table.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell) => (
            <Cell
              key={`${cell.column}y+${cell.row}x`}
              details={cell}
              addFlag={addFlag}
              revealCell={revealCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
