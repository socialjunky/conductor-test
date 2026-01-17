// Basic arithmetic utility functions
export function add(a: number, b: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

  return a + b;
}

export function subtract(a: number, b: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Parameters cannot be NaN');
  }

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

export function divide(dividend: number, divisor: number): number {
  // Input validation to ensure both parameters are numbers
  if (typeof dividend !== 'number' || typeof divisor !== 'number') {
    throw new Error('Both parameters must be numbers');
  }

  // Additional validation for NaN values
  if (isNaN(dividend) || isNaN(divisor)) {
    throw new Error('Parameters cannot be NaN');
  }

  // Handle division by zero
  if (divisor === 0) {
    throw new Error('Division by zero is not allowed');
  }

  return dividend / divisor;
}