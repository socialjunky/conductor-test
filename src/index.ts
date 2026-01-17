// Export Calculator class as main entry point
export { Calculator } from './calculator';

// Math utilities (legacy functions - kept for backwards compatibility)
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  // Legacy function maintains simpler behavior for backwards compatibility
  // Unlike Calculator class multiply method, this doesn't include input validation
  return a * b;
}

export function divide(dividend: number, divisor: number): number | null {
  // Handle division by zero by returning null
  if (divisor === 0) {
    return null;
  }

  return dividend / divisor;
}
