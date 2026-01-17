# conductor-test - Technical Requirements

## Overview

This module provides basic arithmetic utility functions with robust error handling and a Calculator class with history functionality. It includes functions for addition, subtraction, multiplication, and division operations, plus a Calculator class that maintains a history of the last 10 operations.

---

## Dependencies

### Internal Dependencies
<!-- List other internal packages/modules this depends on -->

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### `add(a: number, b: number): number`
Adds two numbers together.
- **Parameters**: `a`, `b` - numbers to add
- **Returns**: Sum of the two numbers
- **Throws**: Error if parameters are not numbers or are NaN

#### `subtract(a: number, b: number): number`
Subtracts the second number from the first.
- **Parameters**: `a` - minuend, `b` - subtrahend
- **Returns**: Difference of the two numbers
- **Throws**: Error if parameters are not numbers or are NaN

#### `multiply(a: number, b: number): number`
Multiplies two numbers.
- **Parameters**: `a`, `b` - numbers to multiply
- **Returns**: Product of the two numbers
- **Throws**: Error if parameters are not numbers or are NaN

#### `divide(dividend: number, divisor: number): number`
Divides the dividend by the divisor.
- **Parameters**: `dividend` - number to be divided, `divisor` - number to divide by
- **Returns**: Quotient of the division
- **Throws**: Error if parameters are not numbers, are NaN, or if divisor is zero

#### `Calculator` Class
A calculator class that uses the arithmetic functions and maintains a history of operations.

**Methods:**
- `add(a: number, b: number): number` - Performs addition and records to history
- `subtract(a: number, b: number): number` - Performs subtraction and records to history
- `multiply(a: number, b: number): number` - Performs multiplication and records to history
- `divide(dividend: number, divisor: number): number` - Performs division and records to history
- `history(): CalculatorOperation[]` - Returns array of last 10 operations
- `clear(): void` - Clears the operation history

#### `CalculatorOperation` Interface
Represents a single calculator operation in the history.
- `operation: string` - The operation type (add, subtract, multiply, divide)
- `operands: number[]` - Array of input operands
- `result: number` - The calculated result
- `timestamp: Date` - When the operation was performed

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
```

---

## Notes

<!-- Any additional technical notes -->

---

*This file should be updated whenever interfaces or dependencies change.*
