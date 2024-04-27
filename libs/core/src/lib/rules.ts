import { type Neighbors, CellStatus } from "./types";

export function getCellNextStatus(cell: CellStatus, neighbors: Neighbors): CellStatus {

    const numOfliveNeighbors = neighbors.filter(n => n === CellStatus.Live).length;

    // Any live cell with fewer than two live neighbors dies
    if (cell === CellStatus.Live && numOfliveNeighbors < 2) {
        return CellStatus.Dead;
    }

    // Any live cell with two or three live neighbors lives
    if (cell === CellStatus.Live) {
        if (numOfliveNeighbors === 2 || numOfliveNeighbors === 3) {
            return CellStatus.Live;
        }
    }

    // Any live cell with more than three live neighbors dies
    if (cell === CellStatus.Live && numOfliveNeighbors > 3) {
        return CellStatus.Dead;
    }

    // Any dead cell with exactly three live neighbors becomes a live cell
    if (cell === CellStatus.Dead && numOfliveNeighbors === 3) {
        return CellStatus.Live;
    }

    return cell
}
