import { Cell } from "../types/types";

const createGrid = (rows: number, columns: number): Cell[][] => {
  const grid: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    grid.push([]);
    for (let column = 0; column < columns; column++) {
      grid[row].push({
        isOpen: false,
        hasMine: false,
        hasFlag: false,
        nearMines: 0,
        row,
        column,
      });
    }
  }

  return grid;
};

const randomizeBombs = (grid: Cell[][], bombs: number) => {
  let bombsPlaced = 0;
  const minesLocations: number[][] = [];
  while (bombsPlaced < bombs) {
    const randomRow = Math.floor(Math.random() * grid.length);
    const randomColumn = Math.floor(Math.random() * grid[0].length);
    const cell = grid[randomRow][randomColumn];
    if (!cell.hasMine) {
      cell.hasMine = true;
      minesLocations.push([randomRow, randomColumn]);
      bombsPlaced++;
    }
  }
  return { grid, minesLocations };
};

const calculateNearMines = (grid: Cell[][], minesLocations: number[][]) => {
  const newGrid = grid.map((row) =>
    row.map((cell) => {
      if (cell.hasMine) {
        return cell;
      }
      const nearMines = minesLocations.filter(
        ([row, column]) =>
          Math.abs(cell.row - row) <= 1 && Math.abs(cell.column - column) <= 1
      ).length;
      return { ...cell, nearMines };
    })
  );
  return newGrid;
};

export const createBoard = (rows: number, columns: number, bombs: number) => {
  const grid = createGrid(rows, columns);
  const { grid: gridWithBombs, minesLocations } = randomizeBombs(grid, bombs);
  const newGrid = calculateNearMines(gridWithBombs, minesLocations);
  return newGrid;
};
