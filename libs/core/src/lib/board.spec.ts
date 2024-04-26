import * as board from './board';
import { Board, Neighbors } from './types';

describe('board', () => {

    describe('generateNewBoard', () => {
        it('should generate new board', () => {
            const rows = 3;
            const cols = 3;
            const newBoard = board.generateNewBoard(rows, cols);
            expect(newBoard).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]);
        });
    });

    describe('getNeighbors', () => {
        it('should return neighbors', () => {
            const boardState = [
                [0, 1, 0],
                [1, 0, 1],
                [0, 1, 0],
            ];
            const neighbors = board.getNeighbors(boardState, 1, 1);
            expect(neighbors).toEqual([0, 1, 0, 1, 1, 0, 1, 0]);
        });

        describe('cell at corner', () => {

            let boardState: Board;
            beforeEach(() => {
                boardState = [
                    [0, 1, 0],
                    [1, 0, 1],
                    [0, 1, 0],
                ];
            });

            it('should return neighbors for top left corner', () => {
                const neighbors = board.getNeighbors(boardState, 0, 0);
                expect(neighbors).toEqual([0, 0, 0, 0, 1, 0, 1, 0]);
            });

            it('should return neighbors for top right corner', () => {
                const neighbors = board.getNeighbors(boardState, 0, 2);
                expect(neighbors).toEqual([0, 0, 0, 1, 0, 0, 1, 0]);
            });

            it('should return neighbors for bottom left corner', () => {
                const neighbors = board.getNeighbors(boardState, 2, 0);
                expect(neighbors).toEqual([0, 1, 0, 0, 1, 0, 0, 0]);
            });

            it('should return neighbors for bottom right corner', () => {
                const neighbors = board.getNeighbors(boardState, 2, 2);
                expect(neighbors).toEqual([0, 1, 0, 1, 0, 0, 0, 0]);
            });
        });
    });

    describe('getNumberOfLiveNeighbors', () => {
        it('should return number of live neighbors', () => {
            const neighbors: Neighbors = [0, 1, 0, 1, 1, 0, 1, 0];
            const numberOfLiveNeighbors = board.getNumberOfLiveNeighbors(neighbors);
            expect(numberOfLiveNeighbors).toBe(4);
        });
    });

    describe('getNextBoard', () => {
        it('should return next board scenario 1', () => {
            const boardState = [
                [0, 1, 0],
                [1, 0, 1],
                [0, 1, 0],
            ];
            const nextBoard = board.getNextBoard(boardState);
            expect(nextBoard).toEqual([
                [0, 1, 0],
                [1, 0, 1],
                [0, 1, 0],
            ]);
        });

        it('should return next board scenario 1', () => {
            const boardState = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
            const nextBoard = board.getNextBoard(boardState);
            expect(nextBoard).toEqual([
                [1, 1, 1],
                [1, 0, 1],
                [1, 1, 1],
            ]);
        });
    });
});
