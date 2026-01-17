import { Calculator } from './src/calculator.mjs';

console.log('=== Calculator Demo ===\n');

const calc = new Calculator();

// Perform some operations
console.log('Performing operations:');
console.log(`5 + 3 = ${calc.add(5, 3)}`);
console.log(`10 - 4 = ${calc.subtract(10, 4)}`);
console.log(`6 * 7 = ${calc.multiply(6, 7)}`);
console.log(`15 / 3 = ${calc.divide(15, 3)}`);
console.log(`10 / 0 = ${calc.divide(10, 0)}`); // Should return null

console.log('\n--- History (last 5 operations) ---');
const history = calc.getHistory();
history.forEach((entry, index) => {
  const { operation, operands, result, timestamp } = entry;
  console.log(`${index + 1}. ${operands[0]} ${getSymbol(operation)} ${operands[1]} = ${result} (${timestamp.toLocaleTimeString()})`);
});

console.log('\n--- Last Operation ---');
const lastOp = calc.getLastOperation();
if (lastOp) {
  console.log(`${lastOp.operands[0]} ${getSymbol(lastOp.operation)} ${lastOp.operands[1]} = ${lastOp.result}`);
}

// Test history limit
console.log('\n--- Testing History Limit (performing 12 operations) ---');
for (let i = 1; i <= 12; i++) {
  calc.add(i, 0);
}

console.log(`History length after 12 more operations: ${calc.getHistory().length}`);
console.log('First 3 operations in history (most recent first):');
calc.getHistory().slice(0, 3).forEach((entry, index) => {
  console.log(`${index + 1}. ${entry.operands[0]} + ${entry.operands[1]} = ${entry.result}`);
});

// Test clear
console.log('\n--- Testing Clear Function ---');
calc.clear();
console.log(`History length after clear: ${calc.getHistory().length}`);
console.log(`Last operation after clear: ${calc.getLastOperation()}`);

function getSymbol(operation) {
  const symbols = {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/'
  };
  return symbols[operation] || operation;
}