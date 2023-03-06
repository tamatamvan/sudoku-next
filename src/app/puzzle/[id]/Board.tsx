'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

import cn from 'classnames';

import flatten from 'lodash/flatten';
import differenceInSeconds from 'date-fns/differenceInSeconds';

import { checkSolutionValidity, TCoordinates } from '~/lib/sudoku';
import { useSolutionStore } from './store';

import WinnerModal from './WinnerModal';

type TBoardProps = {
  sudokuRows: string[][];
};

const Board = ({ sudokuRows }: TBoardProps) => {
  const initialized = useRef<Date | null>(null);

  const {
    state: { solution, invalidCoors },
    actions: {
      initializeSolution,
      fillSolution,
      removeSolution,
      addInvalidCoors,
      removeInvalidCoors,
    },
  } = useSolutionStore();

  const completionTimeInSecs = useMemo<number | null>(() => {
    if (
      initialized.current &&
      invalidCoors.length === 0 &&
      !flatten(solution).includes('.')
    ) {
      const completedAt = new Date();
      return differenceInSeconds(completedAt, initialized.current);
    }
    return null;
  }, [invalidCoors, solution]);

  useEffect(() => {
    if (sudokuRows && !initialized.current) {
      // clone sudokuRows to state `solution`
      // and use original sudokuRows as reference
      // to render sudoku board
      initializeSolution(sudokuRows);
      initialized.current = new Date();
    }
    return () => {};
  }, [sudokuRows]);

  const fillPuzzle = (val: string, coor: TCoordinates) => {
    if (!val || val === '0') {
      removeSolution(coor);
    }
    if (parseInt(val) > 0) {
      // when input is valid, create coorStr
      // and check solution validity
      const coorStr = `${coor.x}${coor.y}`;
      const isSolutionForCellValid = checkSolutionValidity(val, coor, solution);

      // solution is invalid, and coordinate not stored in invalidCoors
      if (!isSolutionForCellValid && !invalidCoors.includes(coorStr)) {
        // store `coorStr` to `invalidCoors`
        addInvalidCoors(coorStr);
      }

      // solution is valid, but `coorStr` previously deemed as invalid
      if (isSolutionForCellValid && invalidCoors.includes(coorStr)) {
        // remove `coorStr` from `invalidCoors`
        // update `invalidCoors` value
        removeInvalidCoors(coorStr);
      }

      fillSolution(val, coor);
    }
  };

  return (
    <>
      <WinnerModal
        isOpened={!!completionTimeInSecs}
        completionTimeInSecs={completionTimeInSecs ?? 0}
      />
      <div
        id="sudoku-board"
        className="mx-auto my-8 grid aspect-square max-w-screen-md grid-rows-9 gap-0 border-2 border-gray-700"
      >
        {sudokuRows?.map((row, rowIdx) => (
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
                  'text-red-700': invalidCoors.includes(`${rowIdx}${colIdx}`), // mark text number to red when invalid
                })}
                key={`cell-${rowIdx}-${colIdx}`}
              >
                <input
                  className="h-full w-full grow text-center text-lg font-bold italic sm:text-xl md:text-2xl"
                  type="number"
                  min={0}
                  max={9}
                  maxLength={1}
                  value={solution.length > 0 ? solution[rowIdx][colIdx] : col}
                  disabled={!!completionTimeInSecs || col !== '.'}
                  onChange={(e) =>
                    void fillPuzzle(
                      e.target.value.split('').pop() as string, // making sure only single digit is being inputted
                      {
                        x: rowIdx,
                        y: colIdx,
                      }
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
