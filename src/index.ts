// Math utilities
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Divides two numbers with division by zero validation
 * @param a - The dividend (number to be divided)
 * @param b - The divisor (number to divide by)
 * @returns The quotient of a divided by b
 * @throws Error if divisor is zero or if inputs are not valid numbers
 */
export function divide(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Both arguments must be valid numbers');
  }

  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return a / b;
}

/**
 * Raises a base number to the power of an exponent
 * @param base - The base number
 * @param exp - The exponent
 * @returns The result of base raised to the power of exp
 * @throws Error if inputs are not valid numbers
 */
export function power(base: number, exp: number): number {
  if (typeof base !== 'number' || typeof exp !== 'number' || isNaN(base) || isNaN(exp)) {
    throw new Error('Both arguments must be valid numbers');
  }

  return Math.pow(base, exp);
}

/**
 * Calculates the square root of a number
 * @param n - The number to find the square root of
 * @returns The square root of n
 * @throws Error if input is negative or not a valid number
 */
export function sqrt(n: number): number {
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('Argument must be a valid number');
  }

  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }

  return Math.sqrt(n);
}

/**
 * Calculates the remainder when dividing two numbers
 * @param a - The dividend
 * @param b - The divisor
 * @returns The remainder of a divided by b
 * @throws Error if divisor is zero or if inputs are not valid numbers
 */
export function modulo(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    throw new Error('Both arguments must be valid numbers');
  }

  if (b === 0) {
    throw new Error('Modulo by zero is not allowed');
  }

  return a % b;
}
