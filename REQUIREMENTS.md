# conductor-test - Technical Requirements

## Overview

<!-- Brief description of what this project/module does -->

---

## Dependencies

### Internal Dependencies
<!-- List other internal packages/modules this depends on -->

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### Math Utility Functions

**add(a: number, b: number): number**
- Adds two numbers together
- Returns the sum of a and b

**subtract(a: number, b: number): number**
- Subtracts the second number from the first
- Returns a - b

**multiply(a: number, b: number): number**
- Multiplies two numbers together
- Validates input parameters (throws Error for non-numbers or NaN)
- Returns the product of a and b

**divide(dividend: number, divisor: number): number | null**
- Divides dividend by divisor
- Returns null if divisor is 0 (division by zero)
- Returns the quotient otherwise

**power(base: number, exponent: number): number**
- Calculates base raised to the power of exponent (base^exponent)
- Throws Error for non-numbers, NaN, or negative base with fractional exponent
- Edge cases: 0^0 returns 1, handles Infinity naturally
- Returns base^exponent

**sqrt(n: number): number**
- Calculates the square root of n
- Throws Error for non-numbers, NaN, or negative numbers
- Edge cases: sqrt(0) = 0, sqrt(Infinity) = Infinity
- Returns square root of n

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
