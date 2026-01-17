/**
 * Represents a single operation in the calculator history
 */
export const HistoryEntry = {};

/**
 * Calculator class with basic arithmetic operations and history tracking
 * Maintains a history of the last 10 operations performed
 */
export class Calculator {
  constructor() {
    this.history = [];
    this.MAX_HISTORY_SIZE = 10;
  }

  /**
   * Adds two numbers together
   * @param {number} a First number
   * @param {number} b Second number
   * @returns {number} The sum of a and b
   */
  add(a, b) {
    const result = a + b;
    this.addToHistory('add', [a, b], result);
    return result;
  }

  /**
   * Subtracts the second number from the first
   * @param {number} a First number (minuend)
   * @param {number} b Second number (subtrahend)
   * @returns {number} The difference of a and b
   */
  subtract(a, b) {
    const result = a - b;
    this.addToHistory('subtract', [a, b], result);
    return result;
  }

  /**
   * Multiplies two numbers together
   * @param {number} a First number
   * @param {number} b Second number
   * @returns {number} The product of a and b
   * @throws {Error} if either parameter is not a number or is NaN
   */
  multiply(a, b) {
    // Input validation to ensure both parameters are numbers
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both parameters must be numbers');
    }

    // Additional validation for NaN values
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Parameters cannot be NaN');
    }

    const result = a * b;
    this.addToHistory('multiply', [a, b], result);
    return result;
  }

  /**
   * Divides the first number by the second
   * @param {number} dividend The number to be divided
   * @param {number} divisor The number to divide by
   * @returns {number|null} The quotient of dividend and divisor, or null if divisor is 0
   */
  divide(dividend, divisor) {
    // Handle division by zero by returning null
    const result = divisor === 0 ? null : dividend / divisor;
    this.addToHistory('divide', [dividend, divisor], result);
    return result;
  }

  /**
   * Clears the calculator state and history
   */
  clear() {
    this.history = [];
  }

  /**
   * Gets a copy of the current history
   * @returns {Array} Array of history entries, most recent first
   */
  getHistory() {
    return [...this.history];
  }

  /**
   * Gets the last operation performed
   * @returns {Object|null} The most recent history entry, or null if no operations have been performed
   */
  getLastOperation() {
    return this.history.length > 0 ? this.history[0] : null;
  }

  /**
   * Private method to add an operation to the history
   * Maintains the history size limit by removing oldest entries when necessary
   */
  addToHistory(operation, operands, result) {
    const entry = {
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