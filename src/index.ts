// Math utilities
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
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

export function divide(dividend: number, divisor: number): number | null {
  // Handle division by zero by returning null
  if (divisor === 0) {
    return null;
  }

  return dividend / divisor;
}

/**
 * Calculates base raised to the power of exponent (base^exponent)
 *
 * @param base The base number
 * @param exponent The exponent number
 * @returns The result of base^exponent
 * @throws Error if base is negative and exponent is not an integer
 *
 * Edge cases:
 * - 0^0 returns 1 (mathematical convention)
 * - Negative base with fractional exponent throws error (would result in complex number)
 * - Infinity cases are handled naturally by Math.pow
 */
export function power(base: number, exponent: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof base !== 'number' || typeof exponent !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(base) || isNaN(exponent)) {
    throw new Error('Parameters cannot be NaN');
  }

  // Handle negative base with fractional exponent
  if (base < 0 && !Number.isInteger(exponent)) {
    throw new Error('Cannot calculate fractional exponent of negative number');
  }

  // Handle 0^0 case - return 1 by mathematical convention
  if (base === 0 && exponent === 0) {
    return 1;
  }

  return Math.pow(base, exponent);
}

/**
 * Calculates the square root of a number
 *
 * @param n The number to calculate square root of
 * @returns The square root of n
 * @throws Error if n is negative
 *
 * Edge cases:
 * - Negative numbers throw error (would result in complex number)
 * - 0 returns 0
 * - Infinity returns Infinity
 */
export function sqrt(n: number): number {
  // Input validation to ensure parameter is a number
  if (typeof n !== 'number') {
    throw new Error('Parameter must be a number');
  }

  // Additional validation for NaN values
  if (isNaN(n)) {
    throw new Error('Parameter cannot be NaN');
  }

  // Handle negative numbers
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }

  // Handle 0 case
  if (n === 0) {
    return 0;
  }

  // Handle Infinity case (Math.sqrt naturally handles this)
  return Math.sqrt(n);
}
