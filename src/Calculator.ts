/**
 * Calculator class with history tracking functionality
 */
export class Calculator {
  private history: string[] = [];
  private readonly maxHistorySize = 10;

  /**
   * Add two numbers
   */
  add(a: number, b: number): number {
    const result = a + b;
    this.addToHistory(`${a} + ${b} = ${result}`);
    return result;
  }

  /**
   * Subtract b from a
   */
  subtract(a: number, b: number): number {
    const result = a - b;
    this.addToHistory(`${a} - ${b} = ${result}`);
    return result;
  }

  /**
   * Multiply two numbers
   */
  multiply(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both parameters must be numbers');
    }

    if (isNaN(a) || isNaN(b)) {
      throw new Error('Parameters cannot be NaN');
    }

    const result = a * b;
    this.addToHistory(`${a} × ${b} = ${result}`);
    return result;
  }

  /**
   * Divide a by b
   */
  divide(dividend: number, divisor: number): number {
    if (divisor === 0) {
      throw new Error('Division by zero is not allowed');
    }

    const result = dividend / divisor;
    this.addToHistory(`${dividend} ÷ ${divisor} = ${result}`);
    return result;
  }

  /**
   * Get the calculation history (last 10 operations)
   */
  getHistory(): string[] {
    return [...this.history];
  }

  /**
   * Clear calculator state and history
   */
  clear(): void {
    this.history = [];
  }

  /**
   * Add an operation to history, maintaining max size of 10
   */
  private addToHistory(operation: string): void {
    this.history.push(operation);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
  }
}