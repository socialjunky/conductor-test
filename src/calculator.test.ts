import { Calculator, CalculationRecord } from './index.js';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('basic arithmetic operations', () => {
    test('should add two numbers correctly', () => {
      const result = calculator.add(5, 3);
      expect(result).toBe(8);
    });

    test('should subtract two numbers correctly', () => {
      const result = calculator.subtract(10, 4);
      expect(result).toBe(6);
    });

    test('should multiply two numbers correctly', () => {
      const result = calculator.multiply(7, 6);
      expect(result).toBe(42);
    });

    test('should divide two numbers correctly', () => {
      const result = calculator.divide(15, 3);
      expect(result).toBe(5);
    });

    test('should return null when dividing by zero', () => {
      const result = calculator.divide(10, 0);
      expect(result).toBeNull();
    });

    test('should handle negative numbers', () => {
      expect(calculator.add(-5, 3)).toBe(-2);
      expect(calculator.subtract(-5, 3)).toBe(-8);
      expect(calculator.multiply(-5, 3)).toBe(-15);
      expect(calculator.divide(-15, 3)).toBe(-5);
    });

    test('should handle decimal numbers', () => {
      expect(calculator.add(2.5, 1.5)).toBe(4);
      expect(calculator.subtract(5.7, 2.2)).toBeCloseTo(3.5);
      expect(calculator.multiply(2.5, 4)).toBe(10);
      expect(calculator.divide(7.5, 2.5)).toBe(3);
    });
  });

  describe('multiply validation', () => {
    test('should throw error for non-number parameters', () => {
      expect(() => calculator.multiply('5' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => calculator.multiply(5, '3' as any)).toThrow('Both parameters must be numbers');
      expect(() => calculator.multiply('5' as any, '3' as any)).toThrow('Both parameters must be numbers');
    });

    test('should throw error for NaN parameters', () => {
      expect(() => calculator.multiply(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => calculator.multiply(5, NaN)).toThrow('Parameters cannot be NaN');
      expect(() => calculator.multiply(NaN, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('history functionality', () => {
    test('should record operations in history', () => {
      calculator.add(5, 3);
      calculator.subtract(10, 4);

      const history = calculator.history();
      expect(history).toHaveLength(2);

      expect(history[0].operation).toBe('add');
      expect(history[0].operand1).toBe(5);
      expect(history[0].operand2).toBe(3);
      expect(history[0].result).toBe(8);
      expect(history[0].timestamp).toBeInstanceOf(Date);

      expect(history[1].operation).toBe('subtract');
      expect(history[1].operand1).toBe(10);
      expect(history[1].operand2).toBe(4);
      expect(history[1].result).toBe(6);
    });

    test('should record all operation types in history', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);
      calculator.multiply(4, 3);
      calculator.divide(10, 2);
      calculator.divide(10, 0); // Division by zero

      const history = calculator.history();
      expect(history).toHaveLength(5);

      expect(history[0].operation).toBe('add');
      expect(history[1].operation).toBe('subtract');
      expect(history[2].operation).toBe('multiply');
      expect(history[3].operation).toBe('divide');
      expect(history[4].operation).toBe('divide');
      expect(history[4].result).toBeNull(); // Division by zero result
    });

    test('should limit history to last 10 operations', () => {
      // Perform 15 operations
      for (let i = 1; i <= 15; i++) {
        calculator.add(i, 1);
      }

      const history = calculator.history();
      expect(history).toHaveLength(10);

      // Should have the last 10 operations (6 through 15)
      expect(history[0].operand1).toBe(6);
      expect(history[9].operand1).toBe(15);
    });

    test('should clear history when clear() is called', () => {
      calculator.add(5, 3);
      calculator.subtract(10, 4);
      calculator.multiply(2, 6);

      expect(calculator.history()).toHaveLength(3);

      calculator.clear();

      expect(calculator.history()).toHaveLength(0);
    });

    test('should continue recording after clear', () => {
      calculator.add(1, 1);
      calculator.clear();
      calculator.add(2, 2);

      const history = calculator.history();
      expect(history).toHaveLength(1);
      expect(history[0].operand1).toBe(2);
      expect(history[0].operand2).toBe(2);
      expect(history[0].result).toBe(4);
    });

    test('should have proper timestamp ordering', () => {
      const startTime = new Date();

      calculator.add(1, 1);
      calculator.add(2, 2);

      const history = calculator.history();
      expect(history[0].timestamp.getTime()).toBeGreaterThanOrEqual(startTime.getTime());
      expect(history[1].timestamp.getTime()).toBeGreaterThanOrEqual(history[0].timestamp.getTime());
    });
  });

  describe('edge cases', () => {
    test('should handle very large numbers', () => {
      const largeNum1 = Number.MAX_SAFE_INTEGER - 1;
      const largeNum2 = 1;

      const result = calculator.add(largeNum1, largeNum2);
      expect(result).toBe(Number.MAX_SAFE_INTEGER);

      const history = calculator.history();
      expect(history[0].result).toBe(Number.MAX_SAFE_INTEGER);
    });

    test('should handle very small numbers', () => {
      const smallNum1 = Number.MIN_VALUE;
      const smallNum2 = Number.MIN_VALUE;

      const result = calculator.add(smallNum1, smallNum2);
      expect(result).toBe(smallNum1 + smallNum2);
    });

    test('should handle zero operations', () => {
      expect(calculator.add(0, 0)).toBe(0);
      expect(calculator.subtract(0, 0)).toBe(0);
      expect(calculator.multiply(0, 5)).toBe(0);
      expect(calculator.divide(0, 5)).toBe(0);
    });
  });

  describe('calculation record interface', () => {
    test('should create proper calculation record structure', () => {
      calculator.add(3, 7);
      const history = calculator.history();
      const record: CalculationRecord = history[0];

      expect(record).toHaveProperty('operation');
      expect(record).toHaveProperty('operand1');
      expect(record).toHaveProperty('operand2');
      expect(record).toHaveProperty('result');
      expect(record).toHaveProperty('timestamp');

      expect(typeof record.operation).toBe('string');
      expect(typeof record.operand1).toBe('number');
      expect(typeof record.operand2).toBe('number');
      expect(typeof record.result === 'number' || record.result === null).toBe(true);
      expect(record.timestamp).toBeInstanceOf(Date);
    });
  });
});