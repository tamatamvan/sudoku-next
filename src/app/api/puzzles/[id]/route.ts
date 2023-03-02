// fetch puzzle data using route handlers
// so we don't have to expose SUPABASE secrets to browser/bundles
// since puzzle/:id is rendered using client component

import { NextResponse } from 'next/server';
import { generateSudokuRows } from '~/lib/sudoku';
import { supabase } from '~/lib/supabaseClient';

interface IParams {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: IParams) {
  const { id } = params;

  const { data, error } = await supabase
    .from('sudoku_puzzles')
    .select('puzzle')
    .eq('id', id)
    .single();

  if (data?.puzzle) {
    const sudokuRows = generateSudokuRows(data.puzzle);
    return NextResponse.json(sudokuRows);
  }

  if (error) {
    return new Response(error.message, {
      status: error.code as unknown as number,
    });
  }
}
