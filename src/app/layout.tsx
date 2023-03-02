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
      <body>
        <div className="container mx-auto my-8 px-8">
          <h1 className="mb-4 text-center text-3xl font-bold">{`Let's play SUDOKU! 📝🤔`}</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
