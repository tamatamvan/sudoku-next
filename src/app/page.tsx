import classNames from 'classnames';
import Link from 'next/link';
import { ISudoku } from '~/interfaces';

import { determineDifficulties } from '~/lib/sudoku';
import { supabase } from '~/lib/supabaseClient';

async function getPuzzles() {
  const { data, error } = await supabase.from('sudoku_puzzles').select();

  // Recommendation: handle errors
  if (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data as ISudoku[];
}

const Home = async () => {
  const sudokus = await getPuzzles();
  return (
    <>
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">Select Puzzles</h2>
      <div className=" w-full flex-1 flex-wrap">
        {sudokus.map((sudoku, idx) => {
          const level = determineDifficulties(sudoku.puzzle);
          return (
            <Link
              href={`/puzzle/${sudoku.id}`}
              className="mb-4 block grow cursor-pointer rounded-md border p-4 shadow-md hover:shadow-lg"
              key={sudoku.id}
            >
              <div>
                <div className="mb-2 font-bold">Puzzle No. {idx + 1}</div>
                <div className="font-bold">
                  <span>Difficulty Level: </span>
                  <span
                    className={classNames('italic', {
                      'text-green-500': level === 'EASY',
                      'text-blue-500': level === 'NORMAL',
                      'text-yellow-500': level === 'HARD',
                      'text-amber-700': level === 'SUPER',
                    })}
                  >
                    {determineDifficulties(sudoku.puzzle)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
