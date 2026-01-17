import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { greet } from '../src/greeting.js';

test('greet function returns correct greeting format', () => {
  const result = greet('World');
  assert.equal(result, 'Hello, World!');
});

test('greet function handles different names correctly', () => {
  assert.equal(greet('Alice'), 'Hello, Alice!');
  assert.equal(greet('Bob'), 'Hello, Bob!');
  assert.equal(greet('Charlie'), 'Hello, Charlie!');
});

test('greet function handles empty string', () => {
  const result = greet('');
  assert.equal(result, 'Hello, !');
});

test('greet function handles names with spaces', () => {
  const result = greet('John Doe');
  assert.equal(result, 'Hello, John Doe!');
});

test('greet function handles special characters', () => {
  const result = greet('José');
  assert.equal(result, 'Hello, José!');
});