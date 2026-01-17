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

// User types and interfaces
export type {
  User,
  CreateUserData,
  UpdateUserData,
  UserQuery,
  UserOperationResult
} from './types/user.js';

// User store
export { UserStore } from './stores/UserStore.js';
