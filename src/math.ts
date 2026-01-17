// Mathematical utility functions

/**
 * Checks if a number is even
 * @param num - The number to check
 * @returns true if the number is even, false if odd
 * @throws Error if the input is not a number or is NaN
 */
export function isEven(num: number): boolean {
  // Input validation to ensure parameter is a number
  if (typeof num !== 'number') {
    throw new Error('Parameter must be a number');
  }

  // Additional validation for NaN values
  if (isNaN(num)) {
    throw new Error('Parameter cannot be NaN');
  }

  // Handle non-integer numbers by using Math.floor to get the integer part
  const integerPart = Math.floor(Math.abs(num));

  return integerPart % 2 === 0;
}