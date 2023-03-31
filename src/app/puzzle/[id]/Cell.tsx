import classNames from 'classnames';
import { shallow } from 'zustand/shallow';
import { TCoordinates } from '~/lib/sudoku';
import { useSolutionStore } from './store';

type TCellProps = {
  puzzleValue: string | number;
  coor: TCoordinates;
  isDisabled: boolean;
};

const Cell = ({ puzzleValue, coor, isDisabled }: TCellProps) => {
  const { solution, invalidCoors } = useSolutionStore(
    (store) => store.state,
    shallow
  );

  const handleSolutionInput = useSolutionStore(
    (store) => store.actions.handleSolutionInput
  );

  return (
    <div
      id={`sudoku-cell-${coor.x}${coor.y}`}
      className={classNames('flex aspect-square items-center border', {
        'border-b-gray-700': (coor.x + 1) % 3 === 0 && coor.x < 8,
        'border-r-gray-700': (coor.y + 1) % 3 === 0 && coor.y < 8,
        'text-red-700': invalidCoors.includes(`${coor.x}${coor.y}`), // mark text number to red when invalid
      })}
    >
      <input
        className="h-full w-full grow text-center text-lg font-bold italic sm:text-xl md:text-2xl"
        type="number"
        min={0}
        max={9}
        maxLength={1}
        value={solution.length > 0 ? solution[coor.x][coor.y] : puzzleValue}
        disabled={isDisabled}
        onChange={(e) =>
          void handleSolutionInput(
            e.target.value.split('').pop() as string, // making sure only single digit is being inputted
            {
              x: coor.x,
              y: coor.y,
            }
          )
        }
      />
    </div>
  );
};

export default Cell;
