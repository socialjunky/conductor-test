// Math utility functions

/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtracts the second number from the first
 * @param a - Number to subtract from
 * @param b - Number to subtract
 * @returns The difference between a and b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiplies two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 * @throws {Error} When parameters are not numbers or are NaN
 */
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

/**
 * Divides the first number by the second
 * @param dividend - Number to be divided
 * @param divisor - Number to divide by
 * @returns The quotient, or null if dividing by zero
 */
export function divide(dividend: number, divisor: number): number | null {
  // Handle division by zero by returning null
  if (divisor === 0) {
    return null;
  }

  return dividend / divisor;
}