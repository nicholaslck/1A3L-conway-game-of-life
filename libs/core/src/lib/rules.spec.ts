import * as rules from './rules';
import { Neighbors, CellStatus } from './types';

describe('rules', () => {

  describe('when cell is live', () => {

    describe('when neighbor is less than 2', () => {
      it('should die', () => {
        const cell: CellStatus = CellStatus.Live;
        const neighbors: Neighbors = [0, 1, 0, 0, 0, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Dead);
      });
    });

    describe('when neighbor is 2 or 3', () => {
      it('should live when neighbor is 2', () => {
        const cell: CellStatus = CellStatus.Live;
        const neighbors: Neighbors = [0, 1, 1, 0, 0, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Live);
      });

      it('should live when neighbor is 3', () => {
        const cell: CellStatus = CellStatus.Live;
        const neighbors: Neighbors = [0, 1, 1, 1, 0, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Live);
      });
    });

    describe('when neighbor is more than 3', () => {
      it('should die', () => {
        const cell: CellStatus = CellStatus.Live;
        const neighbors: Neighbors = [0, 1, 1, 1, 1, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Dead);
      });
    });
  });

  describe('when cell is dead', () => {

    describe('when neighbor is 3', () => {
      it('should live', () => {
        const cell: CellStatus = CellStatus.Dead;
        const neighbors: Neighbors = [0, 1, 1, 1, 0, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Live);
      });
    });

    describe('when neighbor is not 3', () => {
      it('should die', () => {
        const cell: CellStatus = CellStatus.Dead;
        const neighbors: Neighbors = [0, 1, 1, 0, 0, 0, 0, 0];
        const result = rules.getCellNextStatus(cell, neighbors);
        expect(result).toBe(CellStatus.Dead);
      });
    });
  });

});
