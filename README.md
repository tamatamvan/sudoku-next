# SUDOKU NEXT

A simple web based sudoku built with Next.js, Tailwindcss, and Supabase.
We utilized the beta `app` directory from Next.js 13 in this project.

## Deployment

This webapp is deployed on Vercel and can be accessed on: https://sudoku-next.vercel.app

## Development

### ENV Variables

All you need are `SUPABASE_PROJECT_URL` and `SUPABASE_ANON_KEY`. You may get both of them from [here](https://app.supabase.com/project/_/settings/general).

Store those keys in `.env` file.

### Migration

To get you started, you can run the following migration on Supabase to create a new sudoku_puzzles table on Supabase and seed some Sudoku puzzles:

```sql
CREATE TABLE "public"."sudoku_puzzles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "puzzle" text NOT NULL
);

CREATE UNIQUE INDEX sudoku_puzzles_pkey ON public.sudoku_puzzles USING btree (id);
CREATE UNIQUE INDEX sudoku_puzzles_puzzle_key ON public.sudoku_puzzles USING btree (puzzle);
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_pkey" PRIMARY KEY USING INDEX "sudoku_puzzles_pkey";
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_puzzle_key" UNIQUE USING INDEX "sudoku_puzzles_puzzle_key";

INSERT INTO "public"."sudoku_puzzles" (puzzle)
VALUES
  ('52...6.........7.13...........4..8..6......5...........418.........3..2...87.....'),
  ('837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524'),
  ('634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872'),
  ('.697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432'),
  ('293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5')
;
```

If you ever need to reset your Supabase database, you can use this to drop the sudoku_puzzles table:

```sql
DROP TABLE "public"."sudoku_puzzles";
```

## Running Dev Server

Once you've done with the migration, you may start the development server by running:

```bash
cd sudoku-next

pnpm install
pnpm dev
```

## Future Features and Improvements

- Improving UI/UX design
- Implementing Auth/Signin feature
- Mark previously completed puzzle
- Store history record for each user
- Hint mode on gameplay
- Gameplay mode with max number of mistakes
- Add unit and e2e tests (technical)

