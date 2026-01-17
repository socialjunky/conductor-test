// Re-export math utilities from utils module
export { add, subtract, multiply, divide } from './utils/math';
// Import functions for internal use in Calculator class
import { add, subtract, multiply, divide } from './utils/math';

// Types for calculator operations
export interface CalculatorOperation {
  operation: string;
  operands: number[];
  result: number;
  timestamp: Date;
}

// Calculator class with history functionality
export class Calculator {
  private operationHistory: CalculatorOperation[] = [];
  private readonly maxHistorySize = 10;

  /**
   * Adds two numbers and records the operation in history
   */
  add(a: number, b: number): number {
    const result = add(a, b);
    this.recordOperation('add', [a, b], result);
    return result;
  }

  /**
   * Subtracts two numbers and records the operation in history
   */
  subtract(a: number, b: number): number {
    const result = subtract(a, b);
    this.recordOperation('subtract', [a, b], result);
    return result;
  }

  /**
   * Multiplies two numbers and records the operation in history
   */
  multiply(a: number, b: number): number {
    const result = multiply(a, b);
    this.recordOperation('multiply', [a, b], result);
    return result;
  }

  /**
   * Divides two numbers and records the operation in history
   */
  divide(dividend: number, divisor: number): number {
    const result = divide(dividend, divisor);
    this.recordOperation('divide', [dividend, divisor], result);
    return result;
  }

  /**
   * Returns the last 10 operations from history
   */
  history(): CalculatorOperation[] {
    return [...this.operationHistory];
  }

  /**
   * Clears the operation history
   */
  clear(): void {
    this.operationHistory = [];
  }

  /**
   * Records an operation in the history, maintaining max size of 10
   */
  private recordOperation(operation: string, operands: number[], result: number): void {
    const operationRecord: CalculatorOperation = {
      operation,
      operands: [...operands],
      result,
      timestamp: new Date()
    };

    this.operationHistory.push(operationRecord);

    // Use slice for better performance when history exceeds max size
    if (this.operationHistory.length > this.maxHistorySize) {
      this.operationHistory = this.operationHistory.slice(-this.maxHistorySize);
    }
  }
}
