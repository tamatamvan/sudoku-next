import classNames from 'classnames';
import Link from 'next/link';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

import { determineDifficulties } from '~/lib/sudoku';
import { supabase } from '~/lib/supabaseClient';

type THomePageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

type TRange = {
  from: number;
  to: number;
};

const LIMIT_PAGE = 5;

async function getPuzzles({ from, to }: TRange) {
  const { data, error, count } = await supabase
    .from('sudoku_puzzles')
    .select('*', { count: 'exact' })
    .range(from, to);

  // Recommendation: handle errors
  if (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return { data, count };
}

const Home = async ({ searchParams }: THomePageProps) => {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 1;
  const range = {
    from: (page - 1) * LIMIT_PAGE,
    to: page * LIMIT_PAGE - 1,
  };

  const { data: sudokus, count } = await getPuzzles(range);
  const totalPage = Math.ceil((count as number) / LIMIT_PAGE);

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
      <div className="my-8 block flex items-center justify-center">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <ChevronDoubleLeftIcon className="h-6 w-6 shrink-0" />{' '}
          </Link>
        )}
        <div
          className={classNames('w-full text-center', {
            'ml-6': page === 1,
            'mr-6': page === totalPage,
          })}
        >
          Page {page} of {totalPage}
        </div>
        {page < totalPage && (
          <Link href={`/?page=${page + 1}`}>
            <ChevronDoubleRightIcon className=" h-6 w-6 shrink-0" />
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
