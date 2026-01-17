// Math utilities
export function add(a: number, b: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a + b;
}

export function subtract(a: number, b: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a - b;
}

export function multiply(a: number, b: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a * b;
}

export function divide(dividend: number, divisor: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof dividend !== 'number' || typeof divisor !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(dividend) || isNaN(divisor)) {
    throw new Error('Parameters cannot be NaN');
  }

  // Handle division by zero
  if (divisor === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return dividend / divisor;
}

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

    // Keep only the last 10 operations
    if (this.operationHistory.length > this.maxHistorySize) {
      this.operationHistory = this.operationHistory.slice(-this.maxHistorySize);
    }
  }
}
