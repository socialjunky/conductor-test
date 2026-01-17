/**
 * Basic tests for math utility functions
 * Run with: npx tsx src/utils/math.test.ts
 */

import { add, subtract, multiply, divide } from './math.js';

function assertEquals(actual: any, expected: any, testName: string): void {
  if (actual !== expected) {
    console.error(`❌ ${testName}: Expected ${expected}, got ${actual}`);
    process.exit(1);
  } else {
    console.log(`✅ ${testName}: Passed`);
  }
}

function assertThrows(fn: () => any, expectedError: string, testName: string): void {
  try {
    fn();
    console.error(`❌ ${testName}: Expected error "${expectedError}" but no error was thrown`);
    process.exit(1);
  } catch (error) {
    if (error instanceof Error && error.message === expectedError) {
      console.log(`✅ ${testName}: Passed`);
    } else {
      console.error(`❌ ${testName}: Expected error "${expectedError}" but got "${error instanceof Error ? error.message : error}"`);
      process.exit(1);
    }
  }
}

console.log('Running math utility tests...\n');

// Test add function
console.log('Testing add function:');
assertEquals(add(2, 3), 5, 'add(2, 3) should return 5');
assertEquals(add(-5, 3), -2, 'add(-5, 3) should return -2');
assertEquals(add(0, 0), 0, 'add(0, 0) should return 0');
assertEquals(add(1.5, 2.5), 4, 'add(1.5, 2.5) should return 4');

// Test add validation
assertThrows(() => add(NaN, 5), 'Parameters cannot be NaN', 'add should throw for NaN parameter');
assertThrows(() => add('5' as any, 3), 'Both parameters must be numbers', 'add should throw for string parameter');

console.log();

// Test subtract function
console.log('Testing subtract function:');
assertEquals(subtract(5, 3), 2, 'subtract(5, 3) should return 2');
assertEquals(subtract(3, 5), -2, 'subtract(3, 5) should return -2');
assertEquals(subtract(0, 0), 0, 'subtract(0, 0) should return 0');
assertEquals(subtract(1.5, 0.5), 1, 'subtract(1.5, 0.5) should return 1');

// Test subtract validation
assertThrows(() => subtract(NaN, 5), 'Parameters cannot be NaN', 'subtract should throw for NaN parameter');
assertThrows(() => subtract(5, '3' as any), 'Both parameters must be numbers', 'subtract should throw for string parameter');

console.log();

// Test multiply function
console.log('Testing multiply function:');
assertEquals(multiply(2, 3), 6, 'multiply(2, 3) should return 6');
assertEquals(multiply(-2, 3), -6, 'multiply(-2, 3) should return -6');
assertEquals(multiply(0, 5), 0, 'multiply(0, 5) should return 0');
assertEquals(multiply(1.5, 2), 3, 'multiply(1.5, 2) should return 3');

// Test multiply validation
assertThrows(() => multiply(NaN, 5), 'Parameters cannot be NaN', 'multiply should throw for NaN parameter');
assertThrows(() => multiply(null as any, 3), 'Both parameters must be numbers', 'multiply should throw for null parameter');

console.log();

// Test divide function
console.log('Testing divide function:');
assertEquals(divide(6, 2), 3, 'divide(6, 2) should return 3');
assertEquals(divide(5, 2), 2.5, 'divide(5, 2) should return 2.5');
assertEquals(divide(-6, 2), -3, 'divide(-6, 2) should return -3');
assertEquals(divide(0, 5), 0, 'divide(0, 5) should return 0');

// Test divide validation
assertThrows(() => divide(5, 0), 'Division by zero is not allowed', 'divide should throw for division by zero');
assertThrows(() => divide(NaN, 5), 'Parameters cannot be NaN', 'divide should throw for NaN parameter');
assertThrows(() => divide(5, undefined as any), 'Both parameters must be numbers', 'divide should throw for undefined parameter');

console.log('\n🎉 All tests passed!');