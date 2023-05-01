import { Cell as ICell } from "../../types/types";

interface CellProps {
  details: ICell;
  addFlag: (row: number, column: number) => void;
  revealCell: (row: number, column: number) => void;
}

const nearMinesColors = ["#78c679", "#41ab5d", "#238c45", "#1b4f33"];

const Cell = ({ details, addFlag, revealCell }: CellProps) => {
  const backgroundColor = (): string => {
    if (details.isOpen && details.hasMine) return "#f44336";

    if (details.isOpen) {
      return nearMinesColors[details.nearMines] || "#1b4f33";
    } else {
      return "#1e1e1e";
    }
  };

  return (
    <div
      className="cell"
      onClick={() => revealCell(details.row, details.column)}
      onContextMenu={(e) => {
        e.preventDefault();
        addFlag(details.row, details.column);
      }}
      style={{
        backgroundColor: backgroundColor(),
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
