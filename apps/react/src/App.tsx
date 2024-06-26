import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Board, { BoardRef } from './lib/Board';

function App() {
  const [rows, setRows] = useState(50);
  const [cols, setCols] = useState(50);
  const [mode, setMode] = useState<string>('edit');
  const [speed, setSpeed] = useState(8);
  const [steps, setSteps] = useState(0);

  const child = useRef<BoardRef>(null);

  const reset = useCallback(() => {
    setMode('edit');
    setSteps(0);
    child.current?.reset();
  }, []);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerId.current) clearInterval(timerId.current);
    if (mode === 'run') {
      timerId.current = setInterval(() => {
        setSteps((steps) => {
          return steps + 1;
        });
      }, 1000 / speed);
    }
  }, [mode, speed]);

  return (
    <>
      <main>
        <h1>Conway's Game of Life</h1>
        <h2>React implementation</h2>

        <form>
          <label htmlFor="rows">Rows:</label>
          <input
            type="number"
            id="rows"
            name="rows"
            min="1"
            max="100"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
            disabled={mode === 'run'}
          />
          <label htmlFor="cols">Columns:</label>
          <input
            type="number"
            id="cols"
            name="cols"
            min="1"
            max="100"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
            disabled={mode === 'run'}
          />
          <label htmlFor="speed">Growth speed:</label>
          <input
            type="number"
            id="speed"
            name="speed"
            min="1"
            max="20"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={mode === 'run'}
          />

          {mode === 'edit' ? (
            <button type="button" onClick={() => setMode('run')}>
              Start
            </button>
          ) : (
            <button type="button" onClick={() => setMode('edit')}>
              Stop
            </button>
          )}

          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>
        <p>Generations: {steps}</p>

        {/* <Board {rows} {cols} {mode} {steps} bind:this={child} /> */}
        <Board rows={rows} cols={cols} mode={mode} steps={steps} ref={child} />
      </main>
      <footer>
        <p>
          This project is developed by{' '}
          <a href="https://github.com/nicholaslck">@nicholaslck</a>, the source
          code is available at{' '}
          <a href="https://github.com/nicholaslck/1A3L-conway-game-of-life">
            Github
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default App;
