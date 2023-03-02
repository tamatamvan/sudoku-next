'use client';

import { useEffect, useState, useRef } from 'react';

import Link from 'next/link';
import useSWRImmutable from 'swr/immutable';
import cn from 'classnames';

import cloneDeep from 'lodash/cloneDeep';

import { checkSolutionValidity } from '~/lib/sudoku';

const puzzleFetcher = (id: string) =>
  fetch(`/api/puzzles/${id}`).then((puzzle) => puzzle.json());

const Puzzle = ({ params }: { params: { id: string } }) => {
  const initialized = useRef<boolean>(false);
  const [solution, setSolution] = useState<string[][]>([]);

  const [invalidCoors, setInvalidCoors] = useState<string[]>([]);

  const {
    data: sudokuRows,
    error,
    isLoading,
  } = useSWRImmutable<string[][]>(params.id, puzzleFetcher);

  useEffect(() => {
    if (sudokuRows && !initialized.current) {
      // clone sudokuRows to state `solution`
      // and use original sudokuRows as reference
      // to render sudoku board
      setSolution(cloneDeep(sudokuRows));
    }

    return () => {
      if (solution.length) {
        initialized.current = true;
      }
    };
  }, [sudokuRows]);

  const fillPuzzle = (val: string, coor: { x: number; y: number }) => {
    if (parseInt(val) > 0) {
      const coorStr = `${coor.x}${coor.y}`;
      const isSolutionForCellValid = checkSolutionValidity(val, coor, solution);

      if (!isSolutionForCellValid && !invalidCoors.includes(coorStr)) {
        setInvalidCoors([...invalidCoors, coorStr]);
      }

      if (isSolutionForCellValid && invalidCoors.includes(coorStr)) {
        const filteredInvalidCoors = invalidCoors.filter(
          (coor) => coor !== coorStr
        );
        setInvalidCoors(filteredInvalidCoors);
      }

      const updatedSolution = [...solution];
      updatedSolution[coor.x][coor.y] = val;
      setSolution(updatedSolution);
    }
  };

  return (
    <>
      <div
        id="sudoku-board"
        className="mx-auto my-8 grid aspect-square max-w-screen-md grid-rows-9 gap-0 border-2 border-gray-700"
      >
        {isLoading && (
          <div className="col-span-full row-span-full flex items-center">
            <p className="grow text-center text-lg font-bold text-gray-500">
              Loading...
            </p>
          </div>
        )}
        {!isLoading &&
          !error &&
          sudokuRows?.map((row, rowIdx) => (
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
                    'text-red-700': invalidCoors.includes(`${rowIdx}${colIdx}`),
                  })}
                  key={`cell-${rowIdx}-${colIdx}`}
                >
                  {col === '.' ? (
                    <input
                      className="h-full w-full grow text-center text-lg font-bold italic sm:text-xl md:text-2xl"
                      type="number"
                      min={1}
                      max={9}
                      maxLength={1}
                      value={
                        solution.length > 0 ? solution[rowIdx][colIdx] : col
                      }
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
                  ) : (
                    <span className="grow text-center text-lg font-bold text-gray-500 sm:text-xl md:text-2xl">
                      {col}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      <Link
        href={'/'}
        className="my-4 block text-center text-lg font-bold hover:underline"
      >
        🏠 Back to homepage
      </Link>
    </>
  );
};

export default Puzzle;
