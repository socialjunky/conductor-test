/**
 * Represents a single operation in the calculator history
 */
export interface HistoryEntry {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  operands: [number, number];
  result: number | null;
  timestamp: Date;
}

/**
 * Calculator class with basic arithmetic operations and history tracking
 * Maintains a history of the last 10 operations performed
 */
export class Calculator {
  private history: HistoryEntry[] = [];
  private readonly MAX_HISTORY_SIZE = 10;

  /**
   * Adds two numbers together
   * @param a First number
   * @param b Second number
   * @returns The sum of a and b
   */
  add(a: number, b: number): number {
    const result = a + b;
    this.addToHistory('add', [a, b], result);
    return result;
  }

  /**
   * Subtracts the second number from the first
   * @param a First number (minuend)
   * @param b Second number (subtrahend)
   * @returns The difference of a and b
   */
  subtract(a: number, b: number): number {
    const result = a - b;
    this.addToHistory('subtract', [a, b], result);
    return result;
  }

  /**
   * Multiplies two numbers together
   * @param a First number
   * @param b Second number
   * @returns The product of a and b
   */
  multiply(a: number, b: number): number {
    const result = a * b;
    this.addToHistory('multiply', [a, b], result);
    return result;
  }

  /**
   * Divides the first number by the second
   * @param dividend The number to be divided
   * @param divisor The number to divide by
   * @returns The quotient of dividend and divisor, or null if divisor is 0
   */
  divide(dividend: number, divisor: number): number | null {
    // Handle division by zero by returning null
    const result = divisor === 0 ? null : dividend / divisor;
    this.addToHistory('divide', [dividend, divisor], result);
    return result;
  }

  /**
   * Clears the calculator state and history
   */
  clear(): void {
    this.history = [];
  }

  /**
   * Gets a copy of the current history
   * @returns Array of history entries, most recent first
   */
  getHistory(): HistoryEntry[] {
    return [...this.history];
  }

  /**
   * Gets the last operation performed
   * @returns The most recent history entry, or null if no operations have been performed
   */
  getLastOperation(): HistoryEntry | null {
    return this.history.length > 0 ? this.history[0] : null;
  }

  /**
   * Private method to add an operation to the history
   * Maintains the history size limit by removing oldest entries when necessary
   */
  private addToHistory(
    operation: HistoryEntry['operation'],
    operands: [number, number],
    result: number | null
  ): void {
    const entry: HistoryEntry = {
      operation,
      operands,
      result,
      timestamp: new Date()
    };

    // Add to the beginning of the array (most recent first)
    this.history.unshift(entry);

    // Keep only the last 10 operations
    if (this.history.length > this.MAX_HISTORY_SIZE) {
      this.history.pop();
    }
  }
}