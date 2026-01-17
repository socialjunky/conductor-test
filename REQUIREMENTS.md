# conductor-test - Technical Requirements

## Overview

A simple calculator module that provides basic arithmetic operations and a Calculator class with operation history tracking.

---

## Dependencies

### Internal Dependencies
<!-- List other internal packages/modules this depends on -->

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### Math Utilities (`src/utils/math.ts`)
- `add(a: number, b: number): number` - Adds two numbers with validation
- `subtract(a: number, b: number): number` - Subtracts second number from first with validation
- `multiply(a: number, b: number): number` - Multiplies two numbers with validation
- `divide(a: number, b: number): number` - Divides first number by second with validation (throws on division by zero)

All math utility functions validate that:
- Both parameters are numbers (throws Error if not)
- Parameters are not NaN (throws Error if NaN)
- Division by zero throws an Error with message "Division by zero is not allowed"

#### Calculator Class (`src/calculator.ts`)
- `Calculator` class - Provides arithmetic operations with history tracking
  - `add(a: number, b: number): number` - Add with history recording
  - `subtract(a: number, b: number): number` - Subtract with history recording
  - `multiply(a: number, b: number): number` - Multiply with history recording (validates inputs)
  - `divide(a: number, b: number): number | null` - Divide with history recording (returns null for division by zero)
  - `history(): string[]` - Returns last 10 operations (most recent first)
  - `clear(): void` - Clears operation history

History format: Operations are stored as strings like "5 + 3 = 8" or "10 / 0 = Error: Division by zero"

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

# Run individual tests
npx tsx src/utils/math.test.ts     # Math utility tests
npx tsx src/calculator.test.ts     # Calculator class tests
```

---

## Notes

<!-- Any additional technical notes -->

---

*This file should be updated whenever interfaces or dependencies change.*
