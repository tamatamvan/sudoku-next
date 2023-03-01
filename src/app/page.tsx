import Link from 'next/link';
import { supabase } from '~/lib/supabaseClient';

async function getPuzzles() {
  const { data, error } = await supabase.from('sudoku_puzzles').select();
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
    <div className="container mx-auto my-8 px-8">
      <h1 className="mb-4 text-3xl font-bold">{`Let's play SUDOKU! 📝🤔`}</h1>
      <h2 className="mb-4 text-2xl font-bold">Select Puzzles</h2>
      {puzzles.map((puzzle, idx) => (
        <Link
          href="/puzzle"
          className="mb-4 block cursor-pointer rounded-md border p-4 shadow-md hover:shadow-lg"
          key={puzzle.id}
        >
          <span className="font-bold">Puzzle No. {idx + 1}</span>
        </Link>
      ))}
    </div>
  );
};

export default Home;
