import './globals.css';

export const metadata = {
  title: 'Sudoku Next - Simple Web Based Sudoku',
  description:
    'Simple web based sudoku game built with Next.js, Supabase, and Tailwindcss',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
