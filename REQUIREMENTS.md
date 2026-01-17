# conductor-test - Technical Requirements

## Overview

A utility library providing basic math operations and greeting functionality. Includes TypeScript definitions and comprehensive test coverage.

---

## Dependencies

### Internal Dependencies
<!-- List other internal packages/modules this depends on -->

### External Dependencies
<!-- Key external libraries and their purposes -->

---

## APIs and Interfaces

### Exported Functions/Classes

#### Math Utilities (src/index.ts)
- `add(a: number, b: number): number` - Adds two numbers
- `subtract(a: number, b: number): number` - Subtracts second number from first
- `multiply(a: number, b: number): number` - Multiplies two numbers with validation
- `divide(dividend: number, divisor: number): number | null` - Divides numbers, returns null for division by zero

#### Greeting Utilities (src/greeting.ts / src/greeting.js)
- `greet(name: string): string` - Creates personalized greeting in format "Hello, {name}!"

### Events
<!-- Any events this module publishes or subscribes to -->

---

## Configuration

<!-- Environment variables and configuration options -->

---

## Build and Run

```bash
# How to test (uses Node.js built-in test runner)
npm test

# No build step required - project uses ES modules directly
# No start script configured - this is a utility library
```

---

## Notes

<!-- Any additional technical notes -->

---

*This file should be updated whenever interfaces or dependencies change.*
