import _times from 'lodash/times';

export type TCoordinates = {
  x: number;
  y: number;
};

export type TDifficulties = 'EASY' | 'NORMAL' | 'HARD' | 'SUPER';

export const determineDifficulties: (str: string) => TDifficulties = (
  sudokuStr
) => {
  const missingTilesNum = sudokuStr
    .split('')
    .filter((str) => str === '.').length;

  if (missingTilesNum < 27) return 'EASY';
  if (missingTilesNum < 50) return 'NORMAL';
  if (missingTilesNum < 60) return 'HARD';
  return 'SUPER';
};

export const generateSudokuRows = (sudokuStr: string) => {
  return _times(9, (round: number) => {
    const rowStart = round * 9;
    const rowEnd = (round + 1) * 9;
    return sudokuStr.slice(rowStart, rowEnd).split('');
  });
};

const checkRow = (value: string, coorX: number, sudokuRows: string[][]) => {
  return !sudokuRows[coorX].includes(value);
};

const checkCol = (value: string, coorY: number, sudokuRows: string[][]) => {
  for (let idx = 0; idx < 9; idx++) {
    if (sudokuRows[idx][coorY] === value) {
      return false;
    }
  }
  return true;
};

const checkSubGrid = (
  value: string,
  coor: TCoordinates,
  sudokuRows: string[][]
) => {
  const subGridStartRow = Math.floor(coor.x / 3) * 3;
  const subGridStartCol = Math.floor(coor.y / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (sudokuRows[subGridStartRow + r][subGridStartCol + c] === value)
        return false;
    }
  }

  return true;
};

export const checkSolutionValidity = (
  value: string,
  coor: TCoordinates,
  sudokuRows: string[][]
) => {
  const isRowValid = checkRow(value, coor.x, sudokuRows);
  if (!isRowValid) return false;

  const isColValid = checkCol(value, coor.y, sudokuRows);
  if (!isColValid) return false;

  const isSubGridValid = checkSubGrid(value, coor, sudokuRows);
  if (!isSubGridValid) return false;

  return true;
};
