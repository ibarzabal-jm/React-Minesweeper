import { Cell as ICell } from "../../types/types";

interface CellProps {
  details: ICell;
  addFlag: (row: number, column: number) => void;
  revealCell: (row: number, column: number) => void;
}

const nearMinesColors = ["#78c679", "#41ab5d", "#238c45", "#1b4f33"];
const Cell = ({ details, addFlag, revealCell }: CellProps) => {
  return (
    <div
      className="cell"
      onClick={() => revealCell(details.row, details.column)}
      onContextMenu={(e) => {
        e.preventDefault();
        addFlag(details.row, details.column);
      }}
      style={{
        backgroundColor: details.isOpen
          ? nearMinesColors[details.nearMines] || "#1b4f33"
          : "#1e1e1e",
      }}
    >
      {details.hasFlag && <span>🚩</span>}
      {details.isOpen && details.hasMine && <span>💣</span>}
      {details.isOpen && details.nearMines > 0 && (
        <span>{details.nearMines}</span>
      )}
    </div>
  );
};

export default Cell;
