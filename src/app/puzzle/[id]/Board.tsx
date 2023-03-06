'use client';

import { useEffect, useRef, useMemo } from 'react';

import cn from 'classnames';

import flatten from 'lodash/flatten';
import differenceInSeconds from 'date-fns/differenceInSeconds';

import { shallow } from 'zustand/shallow';
import { useSolutionStore } from './store';

import WinnerModal from './WinnerModal';
import Cell from './Cell';

type TBoardProps = {
  sudokuRows: string[][];
};

const Board = ({ sudokuRows }: TBoardProps) => {
  const initialized = useRef<Date | null>(null);

  const { solution, invalidCoors } = useSolutionStore(
    (store) => store.state,
    shallow
  );

  const initializeSolution = useSolutionStore(
    (store) => store.actions.initializeSolution
  );

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
    // make sure initializeSolution only run once
    if (sudokuRows && !initialized.current) {
      // clone sudokuRows to initialize `solution`
      // and use original sudokuRows as reference
      // to render sudoku board
      initializeSolution(sudokuRows);
      // record the time the game started
      initialized.current = new Date();
    }
    return () => {};
  }, [sudokuRows]);

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
              <Cell
                puzzleValue={col}
                coor={{ x: rowIdx, y: colIdx }}
                isDisabled={!!completionTimeInSecs || col !== '.'}
                key={`cell-${rowIdx}-${colIdx}`}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
