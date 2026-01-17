/**
 * Tests for Calculator class
 * Run with: npx tsx src/calculator.test.ts
 */

import { Calculator } from './calculator.js';

function assertEquals(actual: any, expected: any, testName: string): void {
  if (actual !== expected) {
    console.error(`❌ ${testName}: Expected ${expected}, got ${actual}`);
    process.exit(1);
  } else {
    console.log(`✅ ${testName}: Passed`);
  }
}

function assertArrayEquals(actual: any[], expected: any[], testName: string): void {
  if (actual.length !== expected.length || !actual.every((val, i) => val === expected[i])) {
    console.error(`❌ ${testName}: Expected [${expected.join(', ')}], got [${actual.join(', ')}]`);
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

console.log('Running Calculator class tests...\n');

// Create a new calculator instance for each test
let calc = new Calculator();

// Test basic arithmetic operations
console.log('Testing arithmetic operations:');
assertEquals(calc.add(2, 3), 5, 'add(2, 3) should return 5');
assertEquals(calc.subtract(5, 3), 2, 'subtract(5, 3) should return 2');
assertEquals(calc.multiply(4, 3), 12, 'multiply(4, 3) should return 12');
assertEquals(calc.divide(6, 2), 3, 'divide(6, 2) should return 3');

console.log();

// Test division by zero
console.log('Testing division by zero:');
assertEquals(calc.divide(5, 0), null, 'divide(5, 0) should return null');

console.log();

// Test history functionality
console.log('Testing history functionality:');
calc.clear(); // Start with clean history

calc.add(2, 3);
calc.subtract(10, 4);
calc.multiply(3, 7);

let history = calc.history();
assertArrayEquals(history, [
  '3 * 7 = 21',
  '10 - 4 = 6',
  '2 + 3 = 5'
], 'History should show last 3 operations in reverse order');

console.log();

// Test history with division by zero
console.log('Testing history with division by zero:');
calc.divide(8, 0);
history = calc.history();
assertArrayEquals(history, [
  '8 / 0 = Error: Division by zero',
  '3 * 7 = 21',
  '10 - 4 = 6',
  '2 + 3 = 5'
], 'History should record division by zero error');

console.log();

// Test history limit (last 10 operations)
console.log('Testing history limit:');
calc.clear();

// Add 15 operations
for (let i = 1; i <= 15; i++) {
  calc.add(i, 1);
}

history = calc.history();
assertEquals(history.length, 10, 'History should contain at most 10 operations');
assertEquals(history[0], '15 + 1 = 16', 'First item should be the most recent operation');
assertEquals(history[9], '6 + 1 = 7', 'Last item should be the 10th most recent operation');

console.log();

// Test clear functionality
console.log('Testing clear functionality:');
calc.clear();
history = calc.history();
assertEquals(history.length, 0, 'History should be empty after clear');

console.log();

// Test validation errors
console.log('Testing validation errors:');
assertThrows(() => calc.add(NaN, 5), 'Parameters cannot be NaN', 'add should throw for NaN parameter');
assertThrows(() => calc.subtract('5' as any, 3), 'Both parameters must be numbers', 'subtract should throw for string parameter');
assertThrows(() => calc.multiply(null as any, 3), 'Both parameters must be numbers', 'multiply should throw for null parameter');
assertThrows(() => calc.divide(5, undefined as any), 'Both parameters must be numbers', 'divide should throw for undefined parameter');

console.log('\n🎉 All Calculator tests passed!');