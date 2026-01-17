# conductor-test - Technical Requirements

## Overview

A calculator module that provides basic arithmetic operations and maintains operation history. Includes individual math functions and a Calculator class with history tracking capabilities.

---

## Dependencies

### Internal Dependencies
- `src/utils/math.ts` - Core arithmetic utility functions used by the Calculator class

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### Arithmetic Functions (from `src/utils/math.ts`)
- `add(a: number, b: number): number` - Adds two numbers with input validation
- `subtract(a: number, b: number): number` - Subtracts second number from first with input validation
- `multiply(a: number, b: number): number` - Multiplies two numbers with input validation
- `divide(dividend: number, divisor: number): number | null` - Divides numbers, returns null for division by zero

All utility functions validate inputs and throw `Error` for non-number or NaN inputs.

#### Calculator Class
- `Calculator` - Main calculator class with history functionality
  - `add(a: number, b: number): number` - Add and record operation
  - `subtract(a: number, b: number): number` - Subtract and record operation
  - `multiply(a: number, b: number): number` - Multiply and record operation
  - `divide(dividend: number, divisor: number): number | null` - Divide and record operation
  - `history(): CalculationRecord[]` - Returns last 10 operations
  - `clear(): void` - Clears operation history

#### Interfaces
- `CalculationRecord` - Interface for recorded operations
  ```typescript
  interface CalculationRecord {
    operation: string;
    operand1: number;
    operand2: number;
    result: number | null;
    timestamp: Date;
  }
  ```

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
npm test
# Test files: src/calculator.test.ts, src/utils/math.test.ts
```

---

## Notes

<!-- Any additional technical notes -->

---

*This file should be updated whenever interfaces or dependencies change.*
