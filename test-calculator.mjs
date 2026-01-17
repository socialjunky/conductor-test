import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Calculator } from './src/calculator.mjs';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Basic Operations', () => {
    test('add should correctly add two numbers', () => {
      assert.strictEqual(calculator.add(2, 3), 5);
      assert.strictEqual(calculator.add(-1, 1), 0);
      assert.ok(Math.abs(calculator.add(0.1, 0.2) - 0.3) < 1e-10);
    });

    test('subtract should correctly subtract two numbers', () => {
      assert.strictEqual(calculator.subtract(5, 3), 2);
      assert.strictEqual(calculator.subtract(1, 1), 0);
      assert.strictEqual(calculator.subtract(-1, -1), 0);
    });

    test('multiply should correctly multiply two numbers', () => {
      assert.strictEqual(calculator.multiply(2, 3), 6);
      assert.strictEqual(calculator.multiply(-2, 3), -6);
      assert.strictEqual(calculator.multiply(0, 5), 0);
    });

    test('multiply should throw error for non-number inputs', () => {
      assert.throws(() => calculator.multiply('2', 3), /Both parameters must be numbers/);
      assert.throws(() => calculator.multiply(2, null), /Both parameters must be numbers/);
    });

    test('multiply should throw error for NaN inputs', () => {
      assert.throws(() => calculator.multiply(NaN, 3), /Parameters cannot be NaN/);
      assert.throws(() => calculator.multiply(2, NaN), /Parameters cannot be NaN/);
    });

    test('divide should correctly divide two numbers', () => {
      assert.strictEqual(calculator.divide(6, 2), 3);
      assert.strictEqual(calculator.divide(5, 2), 2.5);
      assert.strictEqual(calculator.divide(-6, 2), -3);
    });

    test('divide should return null for division by zero', () => {
      assert.strictEqual(calculator.divide(5, 0), null);
      assert.strictEqual(calculator.divide(0, 0), null);
    });
  });

  describe('History Tracking', () => {
    test('should track operation history', () => {
      calculator.add(2, 3);
      const history = calculator.getHistory();

      assert.strictEqual(history.length, 1);
      assert.strictEqual(history[0].operation, 'add');
      assert.deepStrictEqual(history[0].operands, [2, 3]);
      assert.strictEqual(history[0].result, 5);
      assert.ok(history[0].timestamp instanceof Date);
    });

    test('should track multiple operations in order (most recent first)', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);
      calculator.multiply(2, 4);

      const history = calculator.getHistory();
      assert.strictEqual(history.length, 3);

      // Most recent first
      assert.strictEqual(history[0].operation, 'multiply');
      assert.strictEqual(history[0].result, 8);

      assert.strictEqual(history[1].operation, 'subtract');
      assert.strictEqual(history[1].result, 2);

      assert.strictEqual(history[2].operation, 'add');
      assert.strictEqual(history[2].result, 3);
    });

    test('should limit history to last 10 operations', () => {
      // Perform 12 operations
      for (let i = 0; i < 12; i++) {
        calculator.add(i, 1);
      }

      const history = calculator.getHistory();
      assert.strictEqual(history.length, 10);

      // Should have operations 11, 10, 9, ..., 2 (most recent first)
      assert.deepStrictEqual(history[0].operands, [11, 1]);
      assert.deepStrictEqual(history[9].operands, [2, 1]);
    });

    test('should track divide operations including null results', () => {
      calculator.divide(6, 2);
      calculator.divide(5, 0);

      const history = calculator.getHistory();
      assert.strictEqual(history.length, 2);

      assert.strictEqual(history[0].operation, 'divide');
      assert.deepStrictEqual(history[0].operands, [5, 0]);
      assert.strictEqual(history[0].result, null);

      assert.strictEqual(history[1].operation, 'divide');
      assert.deepStrictEqual(history[1].operands, [6, 2]);
      assert.strictEqual(history[1].result, 3);
    });

    test('getLastOperation should return the most recent operation', () => {
      assert.strictEqual(calculator.getLastOperation(), null);

      calculator.add(1, 2);
      calculator.multiply(3, 4);

      const lastOp = calculator.getLastOperation();
      assert.strictEqual(lastOp.operation, 'multiply');
      assert.deepStrictEqual(lastOp.operands, [3, 4]);
      assert.strictEqual(lastOp.result, 12);
    });

    test('history should return a copy, not the original array', () => {
      calculator.add(1, 2);
      const history1 = calculator.getHistory();
      const history2 = calculator.getHistory();

      assert.notStrictEqual(history1, history2); // Different array instances
      assert.deepStrictEqual(history1, history2); // But same content

      // Modifying returned array shouldn't affect internal state
      history1.pop();
      assert.strictEqual(calculator.getHistory().length, 1);
    });
  });

  describe('Clear Functionality', () => {
    test('clear should reset history', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);

      assert.strictEqual(calculator.getHistory().length, 2);

      calculator.clear();

      assert.strictEqual(calculator.getHistory().length, 0);
      assert.strictEqual(calculator.getLastOperation(), null);
    });

    test('calculator should work normally after clear', () => {
      calculator.add(1, 2);
      calculator.clear();

      calculator.multiply(3, 4);

      const history = calculator.getHistory();
      assert.strictEqual(history.length, 1);
      assert.strictEqual(history[0].operation, 'multiply');
      assert.deepStrictEqual(history[0].operands, [3, 4]);
      assert.strictEqual(history[0].result, 12);
    });
  });

  describe('Edge Cases', () => {
    test('should handle operations with very large numbers', () => {
      const large1 = Number.MAX_SAFE_INTEGER;
      const large2 = 1;

      assert.strictEqual(calculator.add(large1, large2), large1 + large2);
      assert.strictEqual(calculator.getHistory()[0].result, large1 + large2);
    });

    test('should handle operations with very small numbers', () => {
      const small1 = Number.MIN_VALUE;
      const small2 = Number.MIN_VALUE;

      assert.strictEqual(calculator.add(small1, small2), small1 + small2);
      assert.strictEqual(calculator.getHistory()[0].result, small1 + small2);
    });

    test('should handle operations with negative zero', () => {
      // Note: In JavaScript, -0 + 0 results in 0, but -0 - 0 results in -0
      assert.strictEqual(calculator.add(-0, 0), 0);
      assert.strictEqual(calculator.subtract(-0, 0), -0);
    });

    test('should handle infinity values', () => {
      assert.strictEqual(calculator.add(Infinity, 1), Infinity);
      assert.strictEqual(calculator.subtract(Infinity, 1), Infinity);
      assert.strictEqual(calculator.multiply(Infinity, 2), Infinity);
      assert.strictEqual(calculator.divide(Infinity, 2), Infinity);

      // But multiply should still validate for NaN
      assert.throws(() => calculator.multiply(Infinity, NaN), /Parameters cannot be NaN/);
    });
  });
});