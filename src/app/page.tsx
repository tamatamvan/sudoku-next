import _times from 'lodash/times';

const Home = () => {
  // static data sample
  const sudokuStr =
    '634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872';

  // generate sudoku rows
  const sudokuRows = _times(9, (round: number) => {
    const rowStart = round * 9;
    const rowEnd = (round + 1) * 9;
    return sudokuStr.slice(rowStart, rowEnd).split('');
  });

  return (
    <div className="container mx-auto my-8 px-8">
      <h1 className="text-3xl font-bold underline mb-4">{`Let's play SUDOKU!`}</h1>
      <div className="grid grid-rows-9 gap-0">
        {sudokuRows.map((row, rowIdx) => (
          <div className="grid grid-cols-9 gap-0" key={`row-${rowIdx}`}>
            {row.map((col, colIdx) => (
              <div
                className="border text-center items-center"
                key={`cell-${rowIdx}-${colIdx}`}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
