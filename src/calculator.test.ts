import { Calculator, CalculatorOperation } from './index.js';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Basic Operations', () => {
    test('should add two numbers correctly', () => {
      const result = calculator.add(5, 3);
      expect(result).toBe(8);
    });

    test('should subtract two numbers correctly', () => {
      const result = calculator.subtract(10, 4);
      expect(result).toBe(6);
    });

    test('should multiply two numbers correctly', () => {
      const result = calculator.multiply(6, 7);
      expect(result).toBe(42);
    });

    test('should divide two numbers correctly', () => {
      const result = calculator.divide(15, 3);
      expect(result).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error for invalid input types', () => {
      expect(() => calculator.add(NaN, 5)).toThrow('Parameters cannot be NaN');
      expect(() => calculator.subtract('5' as any, 3)).toThrow('Both parameters must be numbers');
    });
  });

  describe('History Functionality', () => {
    test('should record operations in history', () => {
      calculator.add(5, 3);
      calculator.subtract(10, 4);

      const history = calculator.history();
      expect(history).toHaveLength(2);
      expect(history[0].operation).toBe('add');
      expect(history[0].operands).toEqual([5, 3]);
      expect(history[0].result).toBe(8);
      expect(history[1].operation).toBe('subtract');
      expect(history[1].operands).toEqual([10, 4]);
      expect(history[1].result).toBe(6);
    });

    test('should include timestamp in history records', () => {
      const beforeTime = new Date();
      calculator.multiply(3, 4);
      const afterTime = new Date();

      const history = calculator.history();
      expect(history[0].timestamp).toBeInstanceOf(Date);
      expect(history[0].timestamp.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(history[0].timestamp.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });

    test('should maintain only last 10 operations', () => {
      // Perform 15 operations
      for (let i = 0; i < 15; i++) {
        calculator.add(i, 1);
      }

      const history = calculator.history();
      expect(history).toHaveLength(10);
      // Should contain operations 5-14 (the last 10)
      expect(history[0].operands).toEqual([5, 1]);
      expect(history[9].operands).toEqual([14, 1]);
    });

    test('should clear history correctly', () => {
      calculator.add(5, 3);
      calculator.subtract(10, 4);
      expect(calculator.history()).toHaveLength(2);

      calculator.clear();
      expect(calculator.history()).toHaveLength(0);
    });

    test('should return a copy of history array', () => {
      calculator.add(5, 3);
      const history1 = calculator.history();
      const history2 = calculator.history();

      expect(history1).toEqual(history2);
      expect(history1).not.toBe(history2); // Different objects

      // Modifying returned array shouldn't affect internal history
      history1.push({
        operation: 'fake',
        operands: [1, 2],
        result: 3,
        timestamp: new Date()
      });
      expect(calculator.history()).toHaveLength(1);
    });
  });

  describe('Mixed Operations', () => {
    test('should handle complex calculation sequence', () => {
      const result1 = calculator.add(10, 5);     // 15
      const result2 = calculator.multiply(3, 4); // 12
      const result3 = calculator.divide(result2, result1); // 12 / 15 = 0.8
      const result4 = calculator.subtract(result1, 2); // 15 - 2 = 13

      expect(result1).toBe(15);
      expect(result2).toBe(12);
      expect(result3).toBe(0.8);
      expect(result4).toBe(13);

      const history = calculator.history();
      expect(history).toHaveLength(4);
      expect(history.map(op => op.operation)).toEqual(['add', 'multiply', 'divide', 'subtract']);
      expect(history.map(op => op.result)).toEqual([15, 12, 0.8, 13]);
    });
  });
});