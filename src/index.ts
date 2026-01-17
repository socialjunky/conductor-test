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
