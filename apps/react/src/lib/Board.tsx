/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import * as core from 'core';
import './Board.css';

export type BoardProps = {
  rows: number;
  cols: number;
  mode: string;
  steps: number;
};

export type BoardRef = {
  reset: () => void;
};

const Board = forwardRef<BoardRef, BoardProps>((props, ref) => {
  const [board, setBoard] = useState<core.Board>([]);
  const [mousedown, setMousedown] = useState(false);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (props.mode === 'run') return;
      const newBoard = [...board];
      newBoard[row][col] =
        newBoard[row][col] === core.CellStatus.Live
          ? core.CellStatus.Dead
          : core.CellStatus.Live;
      setBoard(newBoard);
    },
    [props.mode, board]
  );

  const reset = useCallback(() => {
    const newBoard = core.generateNewBoard(props.rows, props.cols);
    setBoard(newBoard);
  }, [props.rows, props.cols]);

  useImperativeHandle(ref, () => ({
    reset: () => reset(),
  }));

  useEffect(() => {
    reset();
  }, [props.rows, props.cols]);

  useEffect(() => {
    const newBoard = core.getNextBoard(board);
    setBoard(newBoard);
  }, [props.steps]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <div
      className="board"
      onMouseDown={() => setMousedown(true)}
      onMouseUp={() => setMousedown(false)}
      onMouseLeave={() => setMousedown(false)}
    >
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className={`cell`}
              style={{
                backgroundColor:
                  cell === core.CellStatus.Live ? 'black' : 'white',
              }}
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onMouseEnter={() => {
                if (mousedown) handleCellClick(rowIndex, colIndex);
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default Board;
