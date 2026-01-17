/**
 * Basic arithmetic utility functions
 * Provides add, subtract, multiply, and divide operations with proper error handling
 */

/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 * @throws Error if inputs are not valid numbers
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
 * Subtracts the second number from the first
 * @param a - Number to subtract from
 * @param b - Number to subtract
 * @returns The difference of a and b
 * @throws Error if inputs are not valid numbers
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
 * Multiplies two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 * @throws Error if inputs are not valid numbers
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
 * Divides the first number by the second
 * @param dividend - Number to be divided
 * @param divisor - Number to divide by
 * @returns The quotient of dividend and divisor, or null if divisor is zero
 * @throws Error if inputs are not valid numbers
 */
export function divide(dividend: number, divisor: number): number | null {
  if (typeof dividend !== 'number' || typeof divisor !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  if (isNaN(dividend) || isNaN(divisor)) {
    throw new Error('Parameters cannot be NaN');
  }

  // Handle division by zero by returning null
  if (divisor === 0) {
    return null;
  }

  return dividend / divisor;
}