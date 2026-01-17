# conductor-test - Technical Requirements

## Overview

A calculator module with history tracking functionality. Provides both a Calculator class with history tracking and legacy standalone math utility functions.

---

## Dependencies

### Internal Dependencies
<!-- List other internal packages/modules this depends on -->

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### Calculator Class (Primary API)
```typescript
export interface HistoryEntry {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  operands: [number, number];
  result: number | null;
  timestamp: Date;
}

export class Calculator {
  add(a: number, b: number): number
  subtract(a: number, b: number): number
  multiply(a: number, b: number): number
  divide(dividend: number, divisor: number): number | null
  getHistory(): HistoryEntry[]
  getLastOperation(): HistoryEntry | null
  clear(): void
}
```

- **add(a, b)**: Adds two numbers and stores the operation in history
- **subtract(a, b)**: Subtracts b from a and stores the operation in history
- **multiply(a, b)**: Multiplies two numbers with input validation and stores in history. Throws error for non-numbers or NaN values.
- **divide(dividend, divisor)**: Divides dividend by divisor, returns null for division by zero, stores operation in history
- **getHistory()**: Returns array of last 10 operations as HistoryEntry objects (most recent first)
- **getLastOperation()**: Returns the most recent operation or null if no operations performed
- **clear()**: Clears all calculator state and history

**History Management**: The calculator automatically maintains a history of the last 10 operations. Each history entry includes the operation type, operands, result, and timestamp.

#### Legacy Functions (Backwards Compatibility)
```typescript
export function add(a: number, b: number): number
export function subtract(a: number, b: number): number
export function multiply(a: number, b: number): number
export function divide(dividend: number, divisor: number): number | null
```

Note: Both legacy divide function and Calculator.divide return null for division by zero.

### Events
<!-- Any events this module publishes or subscribes to -->

---

## Configuration

<!-- Environment variables and configuration options -->

---

## Build and Run

```bash
# How to build
npm run build

# How to run
npm start

# How to test
node --test test-calculator.mjs

# Run demonstration
node demo.mjs
```

---

## Notes

- The Calculator class is implemented in both TypeScript (`src/calculator.ts`) and JavaScript (`src/calculator.mjs`) versions
- Tests are written using Node.js built-in test runner and can be executed directly
- The JavaScript version is used for testing and demonstration due to lack of TypeScript compilation setup
- Both versions maintain identical functionality and API

---

*This file should be updated whenever interfaces or dependencies change.*
