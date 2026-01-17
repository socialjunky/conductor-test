import { add, subtract, multiply, divide } from './math.js';

describe('Math Utilities', () => {
  describe('add', () => {
    test('adds two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 15)).toBe(25);
    });

    test('adds negative numbers correctly', () => {
      expect(add(-5, -3)).toBe(-8);
      expect(add(-10, 5)).toBe(-5);
      expect(add(10, -5)).toBe(5);
    });

    test('adds zero correctly', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });

    test('handles decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(add(1.5, 2.7)).toBeCloseTo(4.2);
    });

    test('handles large numbers', () => {
      expect(add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
      expect(add(Number.MIN_SAFE_INTEGER, 0)).toBe(Number.MIN_SAFE_INTEGER);
    });

    test('throws error for non-number inputs', () => {
      expect(() => add('5' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => add(5, '3' as any)).toThrow('Both parameters must be numbers');
      expect(() => add(null as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => add(5, undefined as any)).toThrow('Both parameters must be numbers');
    });

    test('throws error for NaN inputs', () => {
      expect(() => add(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => add(5, NaN)).toThrow('Parameters cannot be NaN');
      expect(() => add(NaN, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 4)).toBe(6);
    });

    test('subtracts negative numbers correctly', () => {
      expect(subtract(-5, -3)).toBe(-2);
      expect(subtract(-10, 5)).toBe(-15);
      expect(subtract(10, -5)).toBe(15);
    });

    test('subtracts zero correctly', () => {
      expect(subtract(5, 0)).toBe(5);
      expect(subtract(0, 5)).toBe(-5);
      expect(subtract(0, 0)).toBe(0);
    });

    test('handles decimal numbers', () => {
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
      expect(subtract(2.7, 1.5)).toBeCloseTo(1.2);
    });

    test('throws error for non-number inputs', () => {
      expect(() => subtract('5' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => subtract(5, '3' as any)).toThrow('Both parameters must be numbers');
    });

    test('throws error for NaN inputs', () => {
      expect(() => subtract(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => subtract(5, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
      expect(multiply(5, 6)).toBe(30);
    });

    test('multiplies negative numbers correctly', () => {
      expect(multiply(-3, -4)).toBe(12);
      expect(multiply(-5, 6)).toBe(-30);
      expect(multiply(5, -6)).toBe(-30);
    });

    test('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(0, 0)).toBe(0);
      expect(multiply(-5, 0)).toBe(0);
    });

    test('multiplies by one', () => {
      expect(multiply(5, 1)).toBe(5);
      expect(multiply(1, 5)).toBe(5);
      expect(multiply(-5, 1)).toBe(-5);
    });

    test('handles decimal numbers', () => {
      expect(multiply(0.2, 0.3)).toBeCloseTo(0.06);
      expect(multiply(1.5, 2.5)).toBeCloseTo(3.75);
    });

    test('throws error for non-number inputs', () => {
      expect(() => multiply('5' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => multiply(5, '3' as any)).toThrow('Both parameters must be numbers');
    });

    test('throws error for NaN inputs', () => {
      expect(() => multiply(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => multiply(5, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('divide', () => {
    test('divides two positive numbers correctly', () => {
      expect(divide(12, 3)).toBe(4);
      expect(divide(15, 5)).toBe(3);
    });

    test('divides negative numbers correctly', () => {
      expect(divide(-12, -3)).toBe(4);
      expect(divide(-15, 5)).toBe(-3);
      expect(divide(15, -5)).toBe(-3);
    });

    test('divides by one', () => {
      expect(divide(5, 1)).toBe(5);
      expect(divide(-5, 1)).toBe(-5);
    });

    test('divides zero by a number', () => {
      expect(divide(0, 5)).toBe(0);
      expect(divide(0, -5)).toBe(0);
    });

    test('handles decimal numbers', () => {
      expect(divide(1.5, 0.3)).toBeCloseTo(5);
      expect(divide(7.5, 2.5)).toBeCloseTo(3);
    });

    test('returns null for division by zero', () => {
      expect(divide(5, 0)).toBe(null);
      expect(divide(-5, 0)).toBe(null);
      expect(divide(0, 0)).toBe(null);
      expect(divide(100, 0)).toBe(null);
    });

    test('handles very small divisors (but not zero)', () => {
      expect(divide(1, 0.001)).toBe(1000);
      expect(divide(1, Number.MIN_VALUE)).toBe(Infinity);
    });

    test('handles infinity results', () => {
      expect(divide(Number.MAX_VALUE, 0.001)).toBe(Infinity);
      expect(divide(-Number.MAX_VALUE, 0.001)).toBe(-Infinity);
    });

    test('throws error for non-number inputs', () => {
      expect(() => divide('10' as any, 2)).toThrow('Both parameters must be numbers');
      expect(() => divide(10, '2' as any)).toThrow('Both parameters must be numbers');
    });

    test('throws error for NaN inputs', () => {
      expect(() => divide(NaN, 2)).toThrow('Parameters cannot be NaN');
      expect(() => divide(10, NaN)).toThrow('Parameters cannot be NaN');
    });
  });
});