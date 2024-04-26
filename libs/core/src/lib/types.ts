export enum CellStatus {
    Dead = 0,
    Live = 1,
}

export type Neighbors = [
    CellStatus,
    CellStatus,
    CellStatus,
    CellStatus,
    CellStatus,
    CellStatus,
    CellStatus,
    CellStatus
];


export type BoardRow = CellStatus[];

export type Board = BoardRow[];
