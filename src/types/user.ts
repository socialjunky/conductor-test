/**
 * Core User interface representing a user entity in the system
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** Timestamp when the user was created */
  createdAt: Date;
}

/**
 * Data required to create a new user
 * Excludes id and createdAt as they are generated automatically
 */
export interface CreateUserData {
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
}

/**
 * Data that can be updated for an existing user
 * All fields are optional to allow partial updates
 */
export interface UpdateUserData {
  /** User's full name */
  name?: string;
  /** User's email address */
  email?: string;
}

/**
 * Query parameters for filtering/searching users
 */
export interface UserQuery {
  /** Filter by name (partial match) */
  name?: string;
  /** Filter by email (partial match) */
  email?: string;
  /** Limit number of results */
  limit?: number;
  /** Skip number of results for pagination */
  offset?: number;
}

/**
 * Result type for user operations that may fail
 */
export interface UserOperationResult<T = User> {
  /** Whether the operation was successful */
  success: boolean;
  /** The result data if successful */
  data?: T;
  /** Error message if unsuccessful */
  error?: string;
}