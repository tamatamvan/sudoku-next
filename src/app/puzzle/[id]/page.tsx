import Link from 'next/link';

import { supabase } from '~/lib/supabaseClient';
import { generateSudokuRows } from '~/lib/sudoku';

import Board from './Board';

export async function getSudokuRows(id: string) {
  const { data, error } = await supabase
    .from('sudoku_puzzles')
    .select('puzzle')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Failed to fetch data');
  }

  const sudokuRows = generateSudokuRows(data.puzzle);
  return sudokuRows;
}

const Puzzle = async ({ params }: { params: { id: string } }) => {
  const sudokuRows = (await getSudokuRows(params.id)) ?? [];
  return (
    <>
      <Board sudokuRows={sudokuRows} />
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
