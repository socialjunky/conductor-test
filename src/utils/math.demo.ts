/**
 * Demonstration of math utilities functions
 * Run with: npx tsx src/utils/math.demo.ts
 */

import { add, subtract, multiply, divide } from './math.js';

console.log('Math Utilities Demo');
console.log('===================\n');

// Basic operations
console.log('Basic Operations:');
console.log(`add(10, 5) = ${add(10, 5)}`);
console.log(`subtract(10, 5) = ${subtract(10, 5)}`);
console.log(`multiply(10, 5) = ${multiply(10, 5)}`);
console.log(`divide(10, 5) = ${divide(10, 5)}\n`);

// Decimal operations
console.log('Decimal Operations:');
console.log(`add(2.5, 3.7) = ${add(2.5, 3.7)}`);
console.log(`subtract(10.8, 4.3) = ${subtract(10.8, 4.3)}`);
console.log(`multiply(2.5, 4) = ${multiply(2.5, 4)}`);
console.log(`divide(7.5, 2.5) = ${divide(7.5, 2.5)}\n`);

// Negative numbers
console.log('Negative Numbers:');
console.log(`add(-5, 3) = ${add(-5, 3)}`);
console.log(`subtract(-5, 3) = ${subtract(-5, 3)}`);
console.log(`multiply(-5, 3) = ${multiply(-5, 3)}`);
console.log(`divide(-10, 2) = ${divide(-10, 2)}\n`);

// Error handling examples
console.log('Error Handling:');

// Division by zero
try {
  divide(10, 0);
} catch (error) {
  console.log(`divide(10, 0) throws: ${error instanceof Error ? error.message : error}`);
}

// Invalid parameter types
try {
  add('hello' as any, 5);
} catch (error) {
  console.log(`add('hello', 5) throws: ${error instanceof Error ? error.message : error}`);
}

// NaN parameters
try {
  multiply(NaN, 5);
} catch (error) {
  console.log(`multiply(NaN, 5) throws: ${error instanceof Error ? error.message : error}`);
}