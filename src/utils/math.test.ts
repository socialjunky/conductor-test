import { add, subtract, multiply, divide } from './math';

describe('Math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
      expect(add(-2, 3)).toBe(1);
    });

    it('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should throw error for non-number parameters', () => {
      expect(() => add('2' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => add(2, null as any)).toThrow('Both parameters must be numbers');
    });

    it('should throw error for NaN parameters', () => {
      expect(() => add(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => add(2, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should subtract negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
      expect(subtract(-2, 3)).toBe(-5);
    });

    it('should handle decimal numbers', () => {
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    it('should throw error for non-number parameters', () => {
      expect(() => subtract('5' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => subtract(5, undefined as any)).toThrow('Both parameters must be numbers');
    });

    it('should throw error for NaN parameters', () => {
      expect(() => subtract(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => subtract(5, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
    });

    it('should handle decimal numbers', () => {
      expect(multiply(0.2, 0.3)).toBeCloseTo(0.06);
    });

    it('should handle zero multiplication', () => {
      expect(multiply(0, 5)).toBe(0);
      expect(multiply(5, 0)).toBe(0);
    });

    it('should throw error for non-number parameters', () => {
      expect(() => multiply('2' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => multiply(2, {} as any)).toThrow('Both parameters must be numbers');
    });

    it('should throw error for NaN parameters', () => {
      expect(() => multiply(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => multiply(2, NaN)).toThrow('Parameters cannot be NaN');
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(divide(6, 3)).toBe(2);
    });

    it('should divide negative numbers', () => {
      expect(divide(-6, -3)).toBe(2);
      expect(divide(-6, 3)).toBe(-2);
    });

    it('should handle decimal numbers', () => {
      expect(divide(0.6, 0.3)).toBeCloseTo(2);
    });

    it('should handle division resulting in decimal', () => {
      expect(divide(5, 2)).toBe(2.5);
    });

    it('should throw error for division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
      expect(() => divide(0, 0)).toThrow('Division by zero is not allowed');
    });

    it('should throw error for non-number parameters', () => {
      expect(() => divide('6' as any, 3)).toThrow('Both parameters must be numbers');
      expect(() => divide(6, [] as any)).toThrow('Both parameters must be numbers');
    });

    it('should throw error for NaN parameters', () => {
      expect(() => divide(NaN, 3)).toThrow('Parameters cannot be NaN');
      expect(() => divide(6, NaN)).toThrow('Parameters cannot be NaN');
    });
  });
});