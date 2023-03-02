import Link from 'next/link';
import { supabase } from '~/lib/supabaseClient';

async function getPuzzles() {
  const { data, error } = await supabase.from('sudoku_puzzles').select('id');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return data;
}

const Home = async () => {
  const puzzles = await getPuzzles();
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Select Puzzles</h2>
      {puzzles.map((puzzle, idx) => (
        <Link
          href={`/puzzle/${puzzle.id}`}
          className="mb-4 block cursor-pointer rounded-md border p-4 shadow-md hover:shadow-lg"
          key={puzzle.id}
        >
          <span className="font-bold">Puzzle No. {idx + 1}</span>
        </Link>
      ))}
    </>
  );
};

export default Home;
