# conductor-test - Technical Requirements

## Overview

A TypeScript math utilities library providing basic mathematical operations with type safety and error handling.

---

## Dependencies

### Internal Dependencies
- `src/math.ts` - Core math utility functions

### External Dependencies
- TypeScript (for type checking)

---

## APIs and Interfaces

### Exported Functions/Classes

#### Math Operations
All functions are exported from the main entry point (`src/index.ts`) and implemented in `src/math.ts`:

- **`add(a: number, b: number): number`**
  - Adds two numbers together
  - Parameters: Two numeric values
  - Returns: Sum of the two numbers

- **`subtract(a: number, b: number): number`**
  - Subtracts the second number from the first
  - Parameters: Two numeric values
  - Returns: Difference between the two numbers

- **`multiply(a: number, b: number): number`**
  - Multiplies two numbers together
  - Parameters: Two numeric values
  - Returns: Product of the two numbers
  - Throws: Error if parameters are not numbers or are NaN

- **`divide(dividend: number, divisor: number): number | null`**
  - Divides the first number by the second
  - Parameters: dividend (number to divide), divisor (number to divide by)
  - Returns: Quotient or null if dividing by zero

### Events
None

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
