// Demo file showing usage of math utility functions
import { add, subtract, multiply, divide } from './math';

console.log('Math Utilities Demo');
console.log('==================');

// Basic operations
console.log('\nBasic Operations:');
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`subtract(10, 4) = ${subtract(10, 4)}`);
console.log(`multiply(6, 7) = ${multiply(6, 7)}`);
console.log(`divide(15, 3) = ${divide(15, 3)}`);

// Working with decimals
console.log('\nDecimal Operations:');
console.log(`add(0.1, 0.2) = ${add(0.1, 0.2)}`);
console.log(`subtract(1.5, 0.3) = ${subtract(1.5, 0.3)}`);
console.log(`multiply(2.5, 1.2) = ${multiply(2.5, 1.2)}`);
console.log(`divide(7.5, 2.5) = ${divide(7.5, 2.5)}`);

// Negative numbers
console.log('\nNegative Number Operations:');
console.log(`add(-5, 3) = ${add(-5, 3)}`);
console.log(`subtract(-10, -4) = ${subtract(-10, -4)}`);
console.log(`multiply(-6, 7) = ${multiply(-6, 7)}`);
console.log(`divide(-15, 3) = ${divide(-15, 3)}`);

// Error handling examples
console.log('\nError Handling Examples:');
try {
  divide(10, 0);
} catch (error) {
  console.log(`divide(10, 0) throws: ${(error as Error).message}`);
}

try {
  add(NaN, 5);
} catch (error) {
  console.log(`add(NaN, 5) throws: ${(error as Error).message}`);
}

try {
  subtract('5' as any, 3);
} catch (error) {
  console.log(`subtract('5', 3) throws: ${(error as Error).message}`);
}

console.log('\nDemo completed!');