import { add, subtract, multiply, divide } from './utils/math.js';

/**
 * Calculator class that performs arithmetic operations and maintains operation history
 */
export class Calculator {
  private operationHistory: string[] = [];

  /**
   * Add two numbers and record the operation
   * @param a First number
   * @param b Second number
   * @returns Result of addition
   * @throws Error if parameters are not valid numbers
   */
  add(a: number, b: number): number {
    const result = add(a, b);
    this.recordOperation(a, '+', b, result);
    return result;
  }

  /**
   * Subtract two numbers and record the operation
   * @param a First number (minuend)
   * @param b Second number (subtrahend)
   * @returns Result of subtraction
   * @throws Error if parameters are not valid numbers
   */
  subtract(a: number, b: number): number {
    const result = subtract(a, b);
    this.recordOperation(a, '-', b, result);
    return result;
  }

  /**
   * Multiply two numbers and record the operation
   * @param a First number
   * @param b Second number
   * @returns Result of multiplication
   * @throws Error if parameters are not valid numbers
   */
  multiply(a: number, b: number): number {
    const result = multiply(a, b);
    this.recordOperation(a, '*', b, result);
    return result;
  }

  /**
   * Divide two numbers and record the operation
   * @param a Dividend
   * @param b Divisor
   * @returns Result of division or null if division by zero
   * @throws Error if parameters are not valid numbers or if division by zero
   */
  divide(a: number, b: number): number | null {
    try {
      const result = divide(a, b);
      this.recordOperation(a, '/', b, result);
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === 'Division by zero is not allowed') {
        this.recordOperation(a, '/', b, 'Error: Division by zero');
        return null;
      }
      // Re-throw other validation errors (like invalid parameters)
      throw error;
    }
  }

  /**
   * Get the last 10 operations from history
   * @returns Array of operation strings, most recent first
   */
  history(): string[] {
    return [...this.operationHistory].reverse().slice(0, 10);
  }

  /**
   * Clear the operation history
   */
  clear(): void {
    this.operationHistory = [];
  }

  /**
   * Record an operation in the history
   * @param a First operand
   * @param operator Operation symbol
   * @param b Second operand
   * @param result Result of the operation
   */
  private recordOperation(a: number, operator: string, b: number, result: number | string): void {
    const operation = `${a} ${operator} ${b} = ${result}`;
    this.operationHistory.push(operation);
  }
}