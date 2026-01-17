/**
 * Demo file to manually verify math utilities work correctly
 * This file can be used to test the math functions before proper test runners are set up
 */

import { add, subtract, multiply, divide } from './math.js';

console.log('=== Math Utilities Demo ===\n');

// Test basic operations
console.log('Basic operations:');
console.log('add(2, 3) =', add(2, 3)); // Should be 5
console.log('subtract(10, 4) =', subtract(10, 4)); // Should be 6
console.log('multiply(3, 4) =', multiply(3, 4)); // Should be 12
console.log('divide(15, 3) =', divide(15, 3)); // Should be 5

// Test edge cases
console.log('\nEdge cases:');
console.log('divide(5, 0) =', divide(5, 0)); // Should be null
console.log('add(-5, 3) =', add(-5, 3)); // Should be -2
console.log('multiply(0, 100) =', multiply(0, 100)); // Should be 0

// Test decimal operations
console.log('\nDecimal operations:');
console.log('add(0.1, 0.2) =', add(0.1, 0.2)); // Should be ~0.3
console.log('divide(7.5, 2.5) =', divide(7.5, 2.5)); // Should be 3

// Test error cases
console.log('\nError handling:');
try {
  add(NaN, 5);
} catch (e) {
  console.log('add(NaN, 5) throws:', e.message);
}

try {
  multiply('5' as any, 3);
} catch (e) {
  console.log('multiply("5", 3) throws:', e.message);
}

console.log('\n=== Demo completed ===');