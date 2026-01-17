/**
 * Greeting utility function
 *
 * Provides a simple way to generate greeting messages
 */

/**
 * Creates a personalized greeting message
 * @param name - The name of the person to greet
 * @returns A greeting string in the format "Hello, {name}!"
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}