import { User, CreateUserData, UpdateUserData, UserOperationResult } from '../types/user.js';

/**
 * UserStore class manages users in memory using a Map data structure.
 * Provides CRUD operations for user management with proper error handling.
 */
export class UserStore {
  private users: Map<string, User>;
  private nextId: number;

  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  /**
   * Generate a unique ID for new users
   * @returns A unique string ID
   */
  private generateId(): string {
    return `user_${this.nextId++}`;
  }

  /**
   * Create a new user with the provided data
   * @param userData - The data needed to create a user (name, email)
   * @returns UserOperationResult with the created user or error
   */
  create(userData: CreateUserData): UserOperationResult<User> {
    try {
      // Validate input data
      if (!userData.name || !userData.email) {
        return {
          success: false,
          error: 'Name and email are required'
        };
      }

      // Check for duplicate email
      for (const user of this.users.values()) {
        if (user.email === userData.email) {
          return {
            success: false,
            error: 'User with this email already exists'
          };
        }
      }

      // Create new user
      const newUser: User = {
        id: this.generateId(),
        name: userData.name,
        email: userData.email,
        createdAt: new Date()
      };

      // Store the user
      this.users.set(newUser.id, newUser);

      return {
        success: true,
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create user'
      };
    }
  }

  /**
   * Find a user by their ID
   * @param id - The user ID to search for
   * @returns UserOperationResult with the found user or error
   */
  findById(id: string): UserOperationResult<User> {
    try {
      if (!id) {
        return {
          success: false,
          error: 'User ID is required'
        };
      }

      const user = this.users.get(id);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to find user'
      };
    }
  }

  /**
   * Find all users in the store
   * @returns UserOperationResult with array of all users
   */
  findAll(): UserOperationResult<User[]> {
    try {
      const allUsers = Array.from(this.users.values());
      return {
        success: true,
        data: allUsers
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve users'
      };
    }
  }

  /**
   * Update an existing user with the provided data
   * @param id - The ID of the user to update
   * @param updates - Partial user data to update
   * @returns UserOperationResult with the updated user or error
   */
  update(id: string, updates: UpdateUserData): UserOperationResult<User> {
    try {
      if (!id) {
        return {
          success: false,
          error: 'User ID is required'
        };
      }

      const existingUser = this.users.get(id);
      if (!existingUser) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // If email is being updated, check for duplicates
      if (updates.email && updates.email !== existingUser.email) {
        for (const user of this.users.values()) {
          if (user.id !== id && user.email === updates.email) {
            return {
              success: false,
              error: 'User with this email already exists'
            };
          }
        }
      }

      // Create updated user object
      const updatedUser: User = {
        ...existingUser,
        ...updates
      };

      // Store the updated user
      this.users.set(id, updatedUser);

      return {
        success: true,
        data: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update user'
      };
    }
  }

  /**
   * Delete a user by their ID
   * @param id - The ID of the user to delete
   * @returns UserOperationResult indicating success or failure
   */
  delete(id: string): UserOperationResult<void> {
    try {
      if (!id) {
        return {
          success: false,
          error: 'User ID is required'
        };
      }

      const userExists = this.users.has(id);
      if (!userExists) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      this.users.delete(id);

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  }

  /**
   * Get the total number of users in the store
   * @returns The number of users
   */
  count(): number {
    return this.users.size;
  }

  /**
   * Clear all users from the store
   * @returns UserOperationResult indicating success or failure
   */
  clear(): UserOperationResult<void> {
    try {
      this.users.clear();
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear users'
      };
    }
  }
}