import _times from 'lodash/times';

export const generateSudokuRows = (sudokuStr: string) => {
  return _times(9, (round: number) => {
    const rowStart = round * 9;
    const rowEnd = (round + 1) * 9;
    return sudokuStr.slice(rowStart, rowEnd).split('');
  });
};
