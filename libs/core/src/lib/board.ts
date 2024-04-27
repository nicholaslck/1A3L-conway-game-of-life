import cloneDeep from "lodash.clonedeep";
import { type Board, type BoardRow, CellStatus, type Neighbors } from "./types";
import { getCellNextStatus } from "./rules";

export const generateNewBoard = (rows: number, cols: number): Board => {
    const board: Board = [];
    for (let row = 0; row < rows; row++) {
        const boardRow: BoardRow = Array(cols).fill(CellStatus.Dead);
        board.push(boardRow);
    }
    return board;
}

export const getNeighbors = (board: Board, row: number, col: number): Neighbors => {
    const rows = board.length;
    const cols = board[0].length;

    // 0 1 2
    // 3   4
    // 5 6 7
    const neighbors: Neighbors = [
        row > 0 && col > 0 ? board[row - 1][col - 1] : 0, // 0
        row > 0 ? board[row - 1][col] : 0, // 1
        row > 0 && col < cols - 1 ? board[row - 1][col + 1] : 0, // 2
        col > 0 ? board[row][col - 1] : 0, // 3
        col < cols - 1 ? board[row][col + 1] : 0, // 4
        row < rows - 1 && col > 0 ? board[row + 1][col - 1] : 0, // 5
        row < rows - 1 ? board[row + 1][col] : 0, // 6
        row < rows - 1 && col < cols - 1 ? board[row + 1][col + 1] : 0, // 7
    ]

    return neighbors;
}

export const getNumberOfLiveNeighbors = (neighbors: Neighbors): number => {
    return neighbors.filter(n => n === CellStatus.Live).length;
}

export const getNextBoard = (board: Board): Board => {

    const nextBoard: Board = cloneDeep(board);

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = board[row][col];
            const neighbors = getNeighbors(board, row, col);
            nextBoard[row][col] = getCellNextStatus(cell, neighbors);;
        }
    }

    return nextBoard;
}
