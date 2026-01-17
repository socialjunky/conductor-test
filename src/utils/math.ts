/**
 * Basic arithmetic utility functions with validation
 */

/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 * @throws Error if either parameter is not a number or is NaN
 */
export function add(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a + b;
}

/**
 * Subtracts second number from first number
 * @param a - Number to subtract from
 * @param b - Number to subtract
 * @returns Difference of a and b (a - b)
 * @throws Error if either parameter is not a number or is NaN
 */
export function subtract(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a - b;
}

/**
 * Multiplies two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Product of a and b
 * @throws Error if either parameter is not a number or is NaN
 */
export function multiply(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a * b;
}

/**
 * Divides first number by second number
 * @param a - Dividend (number to be divided)
 * @param b - Divisor (number to divide by)
 * @returns Quotient of a and b (a / b)
 * @throws Error if either parameter is not a number or is NaN
 * @throws Error if divisor is zero (division by zero)
 */
export function divide(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return a / b;
}