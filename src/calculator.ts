import { add, subtract, multiply, divide } from './utils/math.js';

/**
 * Represents a calculation operation with its details
 */
export interface CalculationRecord {
  operation: string;
  operand1: number;
  operand2: number;
  result: number | null;
  timestamp: Date;
}

/**
 * Calculator class that performs arithmetic operations and maintains a history
 */
export class Calculator {
  private operationHistory: CalculationRecord[] = [];

  /**
   * Adds two numbers and records the operation
   * @param a First number
   * @param b Second number
   * @returns Sum of a and b
   */
  add(a: number, b: number): number {
    const result = add(a, b);
    this.recordOperation('add', a, b, result);
    return result;
  }

  /**
   * Subtracts the second number from the first and records the operation
   * @param a First number
   * @param b Second number
   * @returns Difference of a and b
   */
  subtract(a: number, b: number): number {
    const result = subtract(a, b);
    this.recordOperation('subtract', a, b, result);
    return result;
  }

  /**
   * Multiplies two numbers and records the operation
   * @param a First number
   * @param b Second number
   * @returns Product of a and b
   * @throws Error if parameters are not numbers or are NaN
   */
  multiply(a: number, b: number): number {
    const result = multiply(a, b);
    this.recordOperation('multiply', a, b, result);
    return result;
  }

  /**
   * Divides the first number by the second and records the operation
   * @param dividend The number to be divided
   * @param divisor The number to divide by
   * @returns Quotient of dividend and divisor, or null if divisor is 0
   */
  divide(dividend: number, divisor: number): number | null {
    const result = divide(dividend, divisor);
    this.recordOperation('divide', dividend, divisor, result);
    return result;
  }

  /**
   * Returns the last 10 operations from the history
   * @returns Array of up to 10 most recent calculation records
   */
  history(): CalculationRecord[] {
    return this.operationHistory.slice(-10);
  }

  /**
   * Clears the operation history
   */
  clear(): void {
    this.operationHistory = [];
  }

  /**
   * Records an operation in the history
   * @private
   * @param operation The type of operation performed
   * @param operand1 The first operand
   * @param operand2 The second operand
   * @param result The result of the operation
   */
  private recordOperation(operation: string, operand1: number, operand2: number, result: number | null): void {
    const record: CalculationRecord = {
      operation,
      operand1,
      operand2,
      result,
      timestamp: new Date()
    };
    this.operationHistory.push(record);
  }
}