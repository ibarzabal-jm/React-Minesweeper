import { Cell as ICell } from "../../types/types";

interface CellProps {
  details: ICell;
  addFlag: (row: number, column: number) => void;
  revealCell: (row: number, column: number) => void;
}

const Cell = ({ details, addFlag, revealCell }: CellProps) => {
  return (
    <div
      className="cell"
      onClick={() => revealCell(details.row, details.column)}
      onContextMenu={(e) => {
        e.preventDefault();
        addFlag(details.row, details.column);
      }}
    >
      {details.hasFlag
        ? "Flag"
        : !details.isOpen
        ? "-"
        : details.hasMine
        ? "X"
        : details.nearMines
        ? details.nearMines
        : ""}
    </div>
  );
};

export default Cell;
