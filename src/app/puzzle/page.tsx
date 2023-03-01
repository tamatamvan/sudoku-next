'use client';

import { useState } from 'react';
import _times from 'lodash/times';

import cn from 'classnames';

// generate sudoku rows
const generateSudokuRows = (sudokuStr: string) => {
  return _times(9, (round: number) => {
    const rowStart = round * 9;
    const rowEnd = (round + 1) * 9;
    return sudokuStr.slice(rowStart, rowEnd).split('');
  });
};

const Puzzle = () => {
  // static data sample
  const sudokuStr =
    '634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872';
  const [sudokuRows, setSudokuRows] = useState<string[][]>(
    generateSudokuRows(sudokuStr)
  );

  return (
    <div className="container mx-auto my-8 px-8">
      <h1 className="mb-4 text-3xl font-bold underline">{`Let's play SUDOKU!`}</h1>
      <div
        id="sudoku-board"
        className="mx-auto grid max-w-screen-md grid-rows-9 gap-0 border-2 border-gray-700"
      >
        {sudokuRows.map((row, rowIdx) => (
          <div
            className={cn('grid grid-cols-9 gap-0')}
            id={`sudoku-row-${rowIdx}`}
            key={`row-${rowIdx}`}
          >
            {row.map((col, colIdx) => (
              <div
                id={`sudoku-cell-${rowIdx}${colIdx}`}
                className={cn('flex aspect-square items-center border', {
                  'border-b-gray-700': (rowIdx + 1) % 3 === 0 && rowIdx < 8,
                  'border-r-gray-700': (colIdx + 1) % 3 === 0 && colIdx < 8,
                })}
                key={`cell-${rowIdx}-${colIdx}`}
              >
                {col === '.' ? (
                  <input
                    className="h-full w-full grow text-center text-lg font-bold italic sm:text-xl"
                    type="number"
                    min={1}
                    max={9}
                    maxLength={1}
                  />
                ) : (
                  <span className="grow text-center text-lg font-bold text-gray-500 sm:text-xl">
                    {col}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
