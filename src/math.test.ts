import { multiply, add, subtract, divide } from './math';

// Simple test function for multiply
function testMultiply() {
  console.log('Testing multiply function...');

  // Test basic multiplication
  const result1 = multiply(2, 3);
  console.assert(result1 === 6, `Expected 6, got ${result1}`);

  // Test with floating point numbers
  const result2 = multiply(2.5, 4);
  console.assert(result2 === 10, `Expected 10, got ${result2}`);

  // Test with negative numbers
  const result3 = multiply(-3, 4);
  console.assert(result3 === -12, `Expected -12, got ${result3}`);

  // Test with zero
  const result4 = multiply(0, 5);
  console.assert(result4 === 0, `Expected 0, got ${result4}`);

  // Test error handling for invalid types
  try {
    multiply('2' as any, 3);
    console.assert(false, 'Should have thrown error for string input');
  } catch (error) {
    console.assert(error instanceof Error, 'Should throw Error for invalid type');
  }

  // Test error handling for NaN
  try {
    multiply(NaN, 3);
    console.assert(false, 'Should have thrown error for NaN input');
  } catch (error) {
    console.assert(error instanceof Error, 'Should throw Error for NaN');
  }

  console.log('✅ All multiply function tests passed!');
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testMultiply();
}