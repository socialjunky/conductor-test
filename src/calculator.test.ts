import { Calculator, HistoryEntry } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Basic Operations', () => {
    test('add should correctly add two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('subtract should correctly subtract two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(1, 1)).toBe(0);
      expect(calculator.subtract(-1, -1)).toBe(0);
    });

    test('multiply should correctly multiply two numbers', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(0, 5)).toBe(0);
    });

    test('multiply should throw error for non-number inputs', () => {
      expect(() => calculator.multiply('2' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => calculator.multiply(2, null as any)).toThrow('Both parameters must be numbers');
    });

    test('multiply should throw error for NaN inputs', () => {
      expect(() => calculator.multiply(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => calculator.multiply(2, NaN)).toThrow('Parameters cannot be NaN');
    });


    test('divide should correctly divide two numbers', () => {
      expect(calculator.divide(6, 2)).toBe(3);
      expect(calculator.divide(5, 2)).toBe(2.5);
      expect(calculator.divide(-6, 2)).toBe(-3);
    });

    test('divide should return null for division by zero', () => {
      expect(calculator.divide(5, 0)).toBeNull();
      expect(calculator.divide(0, 0)).toBeNull();
    });
  });

  describe('History Tracking', () => {
    test('should track operation history', () => {
      calculator.add(2, 3);
      const history = calculator.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0]).toMatchObject({
        operation: 'add',
        operands: [2, 3],
        result: 5
      });
      expect(history[0].timestamp).toBeInstanceOf(Date);
    });

    test('should track multiple operations in order (most recent first)', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);
      calculator.multiply(2, 4);

      const history = calculator.getHistory();
      expect(history).toHaveLength(3);

      // Most recent first
      expect(history[0].operation).toBe('multiply');
      expect(history[0].result).toBe(8);

      expect(history[1].operation).toBe('subtract');
      expect(history[1].result).toBe(2);

      expect(history[2].operation).toBe('add');
      expect(history[2].result).toBe(3);
    });

    test('should limit history to last 10 operations', () => {
      // Perform 12 operations
      for (let i = 0; i < 12; i++) {
        calculator.add(i, 1);
      }

      const history = calculator.getHistory();
      expect(history).toHaveLength(10);

      // Should have operations 11, 10, 9, ..., 2 (most recent first)
      expect(history[0].operands).toEqual([11, 1]);
      expect(history[9].operands).toEqual([2, 1]);
    });

    test('should track divide operations including null results', () => {
      calculator.divide(6, 2);
      calculator.divide(5, 0);

      const history = calculator.getHistory();
      expect(history).toHaveLength(2);

      expect(history[0]).toMatchObject({
        operation: 'divide',
        operands: [5, 0],
        result: null
      });

      expect(history[1]).toMatchObject({
        operation: 'divide',
        operands: [6, 2],
        result: 3
      });
    });

    test('getLastOperation should return the most recent operation', () => {
      expect(calculator.getLastOperation()).toBeNull();

      calculator.add(1, 2);
      calculator.multiply(3, 4);

      const lastOp = calculator.getLastOperation();
      expect(lastOp).toMatchObject({
        operation: 'multiply',
        operands: [3, 4],
        result: 12
      });
    });

    test('history should return a copy, not the original array', () => {
      calculator.add(1, 2);
      const history1 = calculator.getHistory();
      const history2 = calculator.getHistory();

      expect(history1).not.toBe(history2); // Different array instances
      expect(history1).toEqual(history2); // But same content

      // Modifying returned array shouldn't affect internal state
      history1.pop();
      expect(calculator.getHistory()).toHaveLength(1);
    });
  });

  describe('Clear Functionality', () => {
    test('clear should reset history', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);

      expect(calculator.getHistory()).toHaveLength(2);

      calculator.clear();

      expect(calculator.getHistory()).toHaveLength(0);
      expect(calculator.getLastOperation()).toBeNull();
    });

    test('calculator should work normally after clear', () => {
      calculator.add(1, 2);
      calculator.clear();

      calculator.multiply(3, 4);

      const history = calculator.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toMatchObject({
        operation: 'multiply',
        operands: [3, 4],
        result: 12
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle operations with very large numbers', () => {
      const large1 = Number.MAX_SAFE_INTEGER;
      const large2 = 1;

      expect(calculator.add(large1, large2)).toBe(large1 + large2);
      expect(calculator.getHistory()[0].result).toBe(large1 + large2);
    });

    test('should handle operations with very small numbers', () => {
      const small1 = Number.MIN_VALUE;
      const small2 = Number.MIN_VALUE;

      expect(calculator.add(small1, small2)).toBe(small1 + small2);
      expect(calculator.getHistory()[0].result).toBe(small1 + small2);
    });

    test('should handle operations with negative zero', () => {
      expect(calculator.add(-0, 0)).toBe(0);
      expect(calculator.subtract(-0, 0)).toBe(0);
    });

    test('should handle infinity values', () => {
      expect(calculator.add(Infinity, 1)).toBe(Infinity);
      expect(calculator.subtract(Infinity, 1)).toBe(Infinity);
      expect(calculator.multiply(Infinity, 2)).toBe(Infinity);
      expect(calculator.divide(Infinity, 2)).toBe(Infinity);
    });
  });
});