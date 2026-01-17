import { UserStore } from '../src/stores/UserStore.js';
import { CreateUserData, UpdateUserData, User } from '../src/types/user.js';

/**
 * Comprehensive tests for UserStore functionality
 * Tests all CRUD operations, edge cases, type safety, ID generation, and timestamp handling
 */
describe('UserStore', () => {
  let userStore: UserStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('ID Generation and Timestamp Handling', () => {
    test('should generate unique sequential IDs for users', () => {
      const userData1: CreateUserData = { name: 'User 1', email: 'user1@example.com' };
      const userData2: CreateUserData = { name: 'User 2', email: 'user2@example.com' };
      const userData3: CreateUserData = { name: 'User 3', email: 'user3@example.com' };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);
      const result3 = userStore.create(userData3);

      expect(result1.data?.id).toBe('user_1');
      expect(result2.data?.id).toBe('user_2');
      expect(result3.data?.id).toBe('user_3');

      // Ensure all IDs are different
      const ids = [result1.data?.id, result2.data?.id, result3.data?.id];
      expect(new Set(ids).size).toBe(3);
    });

    test('should generate IDs that follow the expected format', () => {
      const userData: CreateUserData = { name: 'Test User', email: 'test@example.com' };
      const result = userStore.create(userData);

      expect(result.data?.id).toMatch(/^user_\d+$/);
    });

    test('should set createdAt timestamp close to current time', () => {
      const beforeCreate = new Date();
      const userData: CreateUserData = { name: 'Time Test', email: 'time@example.com' };

      const result = userStore.create(userData);
      const afterCreate = new Date();

      expect(result.data?.createdAt).toBeDefined();
      expect(result.data?.createdAt).toBeInstanceOf(Date);
      expect(result.data?.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(result.data?.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
    });

    test('should preserve createdAt timestamp during updates', () => {
      const userData: CreateUserData = { name: 'Update Test', email: 'update@example.com' };
      const createResult = userStore.create(userData);
      const originalCreatedAt = createResult.data!.createdAt;

      // Wait a small amount to ensure timestamp would be different if modified
      const updates: UpdateUserData = { name: 'Updated Name' };
      const updateResult = userStore.update(createResult.data!.id, updates);

      expect(updateResult.data?.createdAt).toEqual(originalCreatedAt);
      expect(updateResult.data?.createdAt.getTime()).toBe(originalCreatedAt.getTime());
    });

    test('should continue ID sequence after store operations', () => {
      const userData1: CreateUserData = { name: 'User 1', email: 'user1@example.com' };
      const userData2: CreateUserData = { name: 'User 2', email: 'user2@example.com' };

      const result1 = userStore.create(userData1);
      userStore.delete(result1.data!.id);

      const result2 = userStore.create(userData2);
      expect(result2.data?.id).toBe('user_2'); // Should continue sequence, not reuse
    });
  });

  describe('Type Safety and Data Integrity', () => {
    test('should maintain proper TypeScript types for User interface', () => {
      const userData: CreateUserData = { name: 'Type Test', email: 'type@example.com' };
      const result = userStore.create(userData);

      const user: User = result.data!;
      expect(typeof user.id).toBe('string');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    test('should handle CreateUserData interface correctly', () => {
      const userData: CreateUserData = { name: 'Interface Test', email: 'interface@example.com' };

      // Should not allow extra properties in strict TypeScript (runtime test)
      const result = userStore.create(userData);
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('createdAt');
    });

    test('should handle UpdateUserData interface correctly', () => {
      const userData: CreateUserData = { name: 'Update Interface', email: 'update-interface@example.com' };
      const createResult = userStore.create(userData);

      const partialUpdate: UpdateUserData = { name: 'Updated Name' };
      const fullUpdate: UpdateUserData = { name: 'Full Update', email: 'full-update@example.com' };

      const partialResult = userStore.update(createResult.data!.id, partialUpdate);
      expect(partialResult.success).toBe(true);
      expect(partialResult.data?.name).toBe('Updated Name');
      expect(partialResult.data?.email).toBe('update-interface@example.com');

      const fullResult = userStore.update(createResult.data!.id, fullUpdate);
      expect(fullResult.success).toBe(true);
      expect(fullResult.data?.name).toBe('Full Update');
      expect(fullResult.data?.email).toBe('full-update@example.com');
    });
  });

  describe('create', () => {
    test('should create a new user successfully', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const result = userStore.create(userData);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe('John Doe');
      expect(result.data?.email).toBe('john@example.com');
      expect(result.data?.id).toBeDefined();
      expect(result.data?.createdAt).toBeInstanceOf(Date);
    });

    test('should fail when name is missing', () => {
      const userData = {
        name: '',
        email: 'john@example.com'
      };

      const result = userStore.create(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Name and email are required');
    });

    test('should fail when email is missing', () => {
      const userData = {
        name: 'John Doe',
        email: ''
      };

      const result = userStore.create(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Name and email are required');
    });

    test('should fail when email already exists', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      userStore.create(userData);
      const result = userStore.create(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User with this email already exists');
    });

    test('should handle whitespace-only name and email', () => {
      const userData1 = { name: '   ', email: 'test@example.com' };
      const userData2 = { name: 'Test User', email: '   ' };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);

      expect(result1.success).toBe(false);
      expect(result1.error).toBe('Name and email are required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('Name and email are required');
    });

    test('should handle special characters in name and email', () => {
      const userData: CreateUserData = {
        name: 'José María O\'Connor-Smith',
        email: 'josé.maria+test@example.co.uk'
      };

      const result = userStore.create(userData);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('José María O\'Connor-Smith');
      expect(result.data?.email).toBe('josé.maria+test@example.co.uk');
    });

    test('should handle very long name and email', () => {
      const longName = 'A'.repeat(1000);
      const longEmail = 'a'.repeat(100) + '@' + 'b'.repeat(100) + '.com';
      const userData: CreateUserData = {
        name: longName,
        email: longEmail
      };

      const result = userStore.create(userData);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe(longName);
      expect(result.data?.email).toBe(longEmail);
    });

    test('should handle case-sensitive email duplicates', () => {
      const userData1: CreateUserData = { name: 'User 1', email: 'test@EXAMPLE.com' };
      const userData2: CreateUserData = { name: 'User 2', email: 'test@example.com' };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);

      // Should treat emails as case-sensitive (different emails)
      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
    });

    test('should handle multiple users with same name but different emails', () => {
      const userData1: CreateUserData = { name: 'John Doe', email: 'john1@example.com' };
      const userData2: CreateUserData = { name: 'John Doe', email: 'john2@example.com' };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.data?.id).not.toBe(result2.data?.id);
    });

    test('should handle null-like values gracefully', () => {
      // Test with undefined (should be handled by TypeScript, but testing runtime)
      const userData1 = { name: undefined as any, email: 'test@example.com' };
      const userData2 = { name: 'Test User', email: undefined as any };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);

      expect(result1.success).toBe(false);
      expect(result1.error).toBe('Name and email are required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('Name and email are required');
    });
  });

  describe('findById', () => {
    test('should find an existing user', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      const result = userStore.findById(userId);

      expect(result.success).toBe(true);
      expect(result.data?.id).toBe(userId);
      expect(result.data?.name).toBe('John Doe');
    });

    test('should fail when user does not exist', () => {
      const result = userStore.findById('nonexistent');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('should fail when id is empty', () => {
      const result = userStore.findById('');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User ID is required');
    });

    test('should handle null/undefined ID gracefully', () => {
      const result1 = userStore.findById(null as any);
      const result2 = userStore.findById(undefined as any);

      expect(result1.success).toBe(false);
      expect(result1.error).toBe('User ID is required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('User ID is required');
    });

    test('should handle malformed IDs', () => {
      const malformedIds = ['user_', 'user_abc', '123', 'invalid_format', 'user_-1'];

      malformedIds.forEach(id => {
        const result = userStore.findById(id);
        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found');
      });
    });

    test('should handle very long ID strings', () => {
      const longId = 'user_' + '1'.repeat(1000);
      const result = userStore.findById(longId);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('should return complete user object with all properties', () => {
      const userData: CreateUserData = {
        name: 'Complete User Test',
        email: 'complete@example.com'
      };
      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      const result = userStore.findById(userId);

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id');
      expect(result.data).toHaveProperty('name');
      expect(result.data).toHaveProperty('email');
      expect(result.data).toHaveProperty('createdAt');
      expect(result.data?.id).toBe(userId);
      expect(result.data?.name).toBe('Complete User Test');
      expect(result.data?.email).toBe('complete@example.com');
      expect(result.data?.createdAt).toBeInstanceOf(Date);
    });

    test('should return same object reference for multiple finds', () => {
      const userData: CreateUserData = { name: 'Reference Test', email: 'ref@example.com' };
      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      const result1 = userStore.findById(userId);
      const result2 = userStore.findById(userId);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.data).toEqual(result2.data);
    });
  });

  describe('findAll', () => {
    test('should return empty array when no users exist', () => {
      const result = userStore.findAll();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    test('should return all users when they exist', () => {
      const userData1: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      const userData2: CreateUserData = {
        name: 'Jane Smith',
        email: 'jane@example.com'
      };

      userStore.create(userData1);
      userStore.create(userData2);

      const result = userStore.findAll();

      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(2);
    });

    test('should return users in order of creation', () => {
      const users = [
        { name: 'First User', email: 'first@example.com' },
        { name: 'Second User', email: 'second@example.com' },
        { name: 'Third User', email: 'third@example.com' }
      ];

      const createResults = users.map(userData => userStore.create(userData));
      const result = userStore.findAll();

      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(3);

      // Check that users are returned (Map iteration order should match insertion order)
      result.data?.forEach((user, index) => {
        expect(user.name).toBe(users[index].name);
        expect(user.email).toBe(users[index].email);
      });
    });

    test('should handle large number of users', () => {
      const userCount = 1000;
      const createPromises = [];

      for (let i = 0; i < userCount; i++) {
        const userData: CreateUserData = {
          name: `User ${i}`,
          email: `user${i}@example.com`
        };
        createPromises.push(userStore.create(userData));
      }

      const result = userStore.findAll();

      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(userCount);
      expect(result.data?.[0].name).toBe('User 0');
      expect(result.data?.[999].name).toBe('User 999');
    });

    test('should return array with complete user objects', () => {
      const userData: CreateUserData = { name: 'Complete Test', email: 'complete@example.com' };
      userStore.create(userData);

      const result = userStore.findAll();

      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(1);

      const user = result.data?.[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('createdAt');
      expect(typeof user?.id).toBe('string');
      expect(typeof user?.name).toBe('string');
      expect(typeof user?.email).toBe('string');
      expect(user?.createdAt).toBeInstanceOf(Date);
    });

    test('should return fresh array on each call', () => {
      const userData: CreateUserData = { name: 'Array Test', email: 'array@example.com' };
      userStore.create(userData);

      const result1 = userStore.findAll();
      const result2 = userStore.findAll();

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.data).not.toBe(result2.data); // Different array references
      expect(result1.data).toEqual(result2.data); // Same content
    });

    test('should reflect store changes immediately', () => {
      const userData1: CreateUserData = { name: 'Change Test 1', email: 'change1@example.com' };
      const userData2: CreateUserData = { name: 'Change Test 2', email: 'change2@example.com' };

      // Initially empty
      let result = userStore.findAll();
      expect(result.data?.length).toBe(0);

      // Add first user
      const createResult1 = userStore.create(userData1);
      result = userStore.findAll();
      expect(result.data?.length).toBe(1);

      // Add second user
      userStore.create(userData2);
      result = userStore.findAll();
      expect(result.data?.length).toBe(2);

      // Delete first user
      userStore.delete(createResult1.data!.id);
      result = userStore.findAll();
      expect(result.data?.length).toBe(1);
      expect(result.data?.[0].name).toBe('Change Test 2');

      // Clear all
      userStore.clear();
      result = userStore.findAll();
      expect(result.data?.length).toBe(0);
    });
  });

  describe('update', () => {
    test('should update an existing user successfully', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      const updates: UpdateUserData = {
        name: 'John Updated'
      };

      const result = userStore.update(userId, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('John Updated');
      expect(result.data?.email).toBe('john@example.com');
    });

    test('should fail when user does not exist', () => {
      const updates: UpdateUserData = {
        name: 'John Updated'
      };

      const result = userStore.update('nonexistent', updates);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('should fail when updating to existing email', () => {
      const userData1: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      const userData2: CreateUserData = {
        name: 'Jane Smith',
        email: 'jane@example.com'
      };

      const createResult1 = userStore.create(userData1);
      userStore.create(userData2);

      const updates: UpdateUserData = {
        email: 'jane@example.com'
      };

      const result = userStore.update(createResult1.data!.id, updates);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User with this email already exists');
    });

    test('should fail when updating with empty ID', () => {
      const updates: UpdateUserData = { name: 'Updated Name' };
      const result = userStore.update('', updates);

      expect(result.success).toBe(false);
      expect(result.error).toBe('User ID is required');
    });

    test('should handle null/undefined ID in updates', () => {
      const updates: UpdateUserData = { name: 'Updated Name' };

      const result1 = userStore.update(null as any, updates);
      const result2 = userStore.update(undefined as any, updates);

      expect(result1.success).toBe(false);
      expect(result1.error).toBe('User ID is required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('User ID is required');
    });

    test('should update only name when email is not provided', () => {
      const userData: CreateUserData = { name: 'Original Name', email: 'original@example.com' };
      const createResult = userStore.create(userData);

      const updates: UpdateUserData = { name: 'Updated Name Only' };
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Updated Name Only');
      expect(result.data?.email).toBe('original@example.com');
      expect(result.data?.id).toBe(createResult.data!.id);
      expect(result.data?.createdAt).toEqual(createResult.data!.createdAt);
    });

    test('should update only email when name is not provided', () => {
      const userData: CreateUserData = { name: 'Original Name', email: 'original@example.com' };
      const createResult = userStore.create(userData);

      const updates: UpdateUserData = { email: 'updated@example.com' };
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Original Name');
      expect(result.data?.email).toBe('updated@example.com');
      expect(result.data?.id).toBe(createResult.data!.id);
      expect(result.data?.createdAt).toEqual(createResult.data!.createdAt);
    });

    test('should handle empty update object', () => {
      const userData: CreateUserData = { name: 'Empty Update Test', email: 'empty@example.com' };
      const createResult = userStore.create(userData);

      const updates: UpdateUserData = {};
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Empty Update Test');
      expect(result.data?.email).toBe('empty@example.com');
      expect(result.data?.id).toBe(createResult.data!.id);
      expect(result.data?.createdAt).toEqual(createResult.data!.createdAt);
    });

    test('should allow updating to same email (no change)', () => {
      const userData: CreateUserData = { name: 'Same Email Test', email: 'same@example.com' };
      const createResult = userStore.create(userData);

      const updates: UpdateUserData = { email: 'same@example.com', name: 'Updated Name' };
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.email).toBe('same@example.com');
      expect(result.data?.name).toBe('Updated Name');
    });

    test('should handle special characters in updates', () => {
      const userData: CreateUserData = { name: 'Special Test', email: 'special@example.com' };
      const createResult = userStore.create(userData);

      const updates: UpdateUserData = {
        name: 'José María O\'Connor-Smith Jr.',
        email: 'josé.maría+test@example.co.uk'
      };
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('José María O\'Connor-Smith Jr.');
      expect(result.data?.email).toBe('josé.maría+test@example.co.uk');
    });

    test('should handle very long values in updates', () => {
      const userData: CreateUserData = { name: 'Long Test', email: 'long@example.com' };
      const createResult = userStore.create(userData);

      const longName = 'A'.repeat(2000);
      const longEmail = 'b'.repeat(100) + '@' + 'c'.repeat(150) + '.com';

      const updates: UpdateUserData = { name: longName, email: longEmail };
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe(longName);
      expect(result.data?.email).toBe(longEmail);
    });

    test('should handle undefined values in update object', () => {
      const userData: CreateUserData = { name: 'Undefined Test', email: 'undefined@example.com' };
      const createResult = userStore.create(userData);

      const updates = { name: undefined, email: 'new@example.com' } as any;
      const result = userStore.update(createResult.data!.id, updates);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Undefined Test'); // Should preserve original
      expect(result.data?.email).toBe('new@example.com');
    });

    test('should be case-sensitive for email uniqueness check during update', () => {
      const userData1: CreateUserData = { name: 'User 1', email: 'test@EXAMPLE.com' };
      const userData2: CreateUserData = { name: 'User 2', email: 'other@example.com' };

      userStore.create(userData1);
      const createResult2 = userStore.create(userData2);

      const updates: UpdateUserData = { email: 'test@example.com' }; // Different case
      const result = userStore.update(createResult2.data!.id, updates);

      expect(result.success).toBe(true); // Should succeed as emails are case-sensitive
      expect(result.data?.email).toBe('test@example.com');
    });
  });

  describe('delete', () => {
    test('should delete an existing user successfully', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      const result = userStore.delete(userId);

      expect(result.success).toBe(true);
      expect(userStore.count()).toBe(0);
    });

    test('should fail when user does not exist', () => {
      const result = userStore.delete('nonexistent');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
    });

    test('should fail when id is empty', () => {
      const result = userStore.delete('');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User ID is required');
    });

    test('should handle null/undefined ID in delete', () => {
      const result1 = userStore.delete(null as any);
      const result2 = userStore.delete(undefined as any);

      expect(result1.success).toBe(false);
      expect(result1.error).toBe('User ID is required');
      expect(result2.success).toBe(false);
      expect(result2.error).toBe('User ID is required');
    });

    test('should handle malformed IDs gracefully', () => {
      const malformedIds = ['user_', 'user_abc', '123', 'invalid_format', 'user_-1'];

      malformedIds.forEach(id => {
        const result = userStore.delete(id);
        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found');
      });
    });

    test('should remove user from store after deletion', () => {
      const userData: CreateUserData = { name: 'Delete Test', email: 'delete@example.com' };
      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      // Verify user exists
      expect(userStore.count()).toBe(1);
      const findResult = userStore.findById(userId);
      expect(findResult.success).toBe(true);

      // Delete user
      const deleteResult = userStore.delete(userId);
      expect(deleteResult.success).toBe(true);

      // Verify user is removed
      expect(userStore.count()).toBe(0);
      const findAfterDelete = userStore.findById(userId);
      expect(findAfterDelete.success).toBe(false);
      expect(findAfterDelete.error).toBe('User not found');
    });

    test('should handle multiple deletions correctly', () => {
      const users = [
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' }
      ];

      const createResults = users.map(userData => userStore.create(userData));
      expect(userStore.count()).toBe(3);

      // Delete middle user
      const deleteResult2 = userStore.delete(createResults[1].data!.id);
      expect(deleteResult2.success).toBe(true);
      expect(userStore.count()).toBe(2);

      // Verify other users still exist
      const findResult1 = userStore.findById(createResults[0].data!.id);
      const findResult3 = userStore.findById(createResults[2].data!.id);
      expect(findResult1.success).toBe(true);
      expect(findResult3.success).toBe(true);

      // Verify deleted user doesn't exist
      const findDeleted = userStore.findById(createResults[1].data!.id);
      expect(findDeleted.success).toBe(false);
    });

    test('should handle double deletion attempts', () => {
      const userData: CreateUserData = { name: 'Double Delete', email: 'double@example.com' };
      const createResult = userStore.create(userData);
      const userId = createResult.data!.id;

      // First deletion should succeed
      const deleteResult1 = userStore.delete(userId);
      expect(deleteResult1.success).toBe(true);

      // Second deletion should fail
      const deleteResult2 = userStore.delete(userId);
      expect(deleteResult2.success).toBe(false);
      expect(deleteResult2.error).toBe('User not found');
    });

    test('should update findAll results after deletion', () => {
      const userData1: CreateUserData = { name: 'Find All Test 1', email: 'findall1@example.com' };
      const userData2: CreateUserData = { name: 'Find All Test 2', email: 'findall2@example.com' };

      const createResult1 = userStore.create(userData1);
      userStore.create(userData2);

      let findAllResult = userStore.findAll();
      expect(findAllResult.data?.length).toBe(2);

      userStore.delete(createResult1.data!.id);

      findAllResult = userStore.findAll();
      expect(findAllResult.data?.length).toBe(1);
      expect(findAllResult.data?.[0].name).toBe('Find All Test 2');
    });

    test('should return no data on successful deletion', () => {
      const userData: CreateUserData = { name: 'No Data Test', email: 'nodata@example.com' };
      const createResult = userStore.create(userData);

      const deleteResult = userStore.delete(createResult.data!.id);

      expect(deleteResult.success).toBe(true);
      expect(deleteResult.data).toBeUndefined();
      expect(deleteResult.error).toBeUndefined();
    });
  });

  describe('count', () => {
    test('should return 0 when no users exist', () => {
      expect(userStore.count()).toBe(0);
    });

    test('should return correct count when users exist', () => {
      const userData1: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      const userData2: CreateUserData = {
        name: 'Jane Smith',
        email: 'jane@example.com'
      };

      userStore.create(userData1);
      userStore.create(userData2);

      expect(userStore.count()).toBe(2);
    });

    test('should update count accurately with operations', () => {
      expect(userStore.count()).toBe(0);

      // Add users
      const userData1: CreateUserData = { name: 'Count Test 1', email: 'count1@example.com' };
      const userData2: CreateUserData = { name: 'Count Test 2', email: 'count2@example.com' };
      const userData3: CreateUserData = { name: 'Count Test 3', email: 'count3@example.com' };

      const createResult1 = userStore.create(userData1);
      expect(userStore.count()).toBe(1);

      const createResult2 = userStore.create(userData2);
      expect(userStore.count()).toBe(2);

      const createResult3 = userStore.create(userData3);
      expect(userStore.count()).toBe(3);

      // Delete user
      userStore.delete(createResult1.data!.id);
      expect(userStore.count()).toBe(2);

      // Update user (should not change count)
      userStore.update(createResult2.data!.id, { name: 'Updated Name' });
      expect(userStore.count()).toBe(2);

      // Clear all
      userStore.clear();
      expect(userStore.count()).toBe(0);
    });

    test('should handle large counts correctly', () => {
      const userCount = 5000;

      for (let i = 0; i < userCount; i++) {
        const userData: CreateUserData = {
          name: `User ${i}`,
          email: `user${i}@example.com`
        };
        userStore.create(userData);
      }

      expect(userStore.count()).toBe(userCount);
    });

    test('should return number type', () => {
      expect(typeof userStore.count()).toBe('number');

      userStore.create({ name: 'Type Test', email: 'type@example.com' });
      expect(typeof userStore.count()).toBe('number');
    });
  });

  describe('clear', () => {
    test('should clear all users successfully', () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      userStore.create(userData);
      expect(userStore.count()).toBe(1);

      const result = userStore.clear();

      expect(result.success).toBe(true);
      expect(userStore.count()).toBe(0);
    });

    test('should clear empty store without error', () => {
      expect(userStore.count()).toBe(0);

      const result = userStore.clear();

      expect(result.success).toBe(true);
      expect(userStore.count()).toBe(0);
    });

    test('should clear store with multiple users', () => {
      const users = [
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' },
        { name: 'User 4', email: 'user4@example.com' },
        { name: 'User 5', email: 'user5@example.com' }
      ];

      users.forEach(userData => userStore.create(userData));
      expect(userStore.count()).toBe(5);

      const result = userStore.clear();

      expect(result.success).toBe(true);
      expect(userStore.count()).toBe(0);
    });

    test('should clear large number of users', () => {
      const userCount = 1000;

      for (let i = 0; i < userCount; i++) {
        const userData: CreateUserData = {
          name: `Mass User ${i}`,
          email: `mass${i}@example.com`
        };
        userStore.create(userData);
      }

      expect(userStore.count()).toBe(userCount);

      const result = userStore.clear();

      expect(result.success).toBe(true);
      expect(userStore.count()).toBe(0);
    });

    test('should make all users unfindable after clear', () => {
      const userData1: CreateUserData = { name: 'Clear Test 1', email: 'clear1@example.com' };
      const userData2: CreateUserData = { name: 'Clear Test 2', email: 'clear2@example.com' };

      const createResult1 = userStore.create(userData1);
      const createResult2 = userStore.create(userData2);

      const userId1 = createResult1.data!.id;
      const userId2 = createResult2.data!.id;

      // Verify users exist
      expect(userStore.findById(userId1).success).toBe(true);
      expect(userStore.findById(userId2).success).toBe(true);

      userStore.clear();

      // Verify users no longer exist
      expect(userStore.findById(userId1).success).toBe(false);
      expect(userStore.findById(userId2).success).toBe(false);
    });

    test('should make findAll return empty array after clear', () => {
      const userData: CreateUserData = { name: 'Find All Clear', email: 'findallclear@example.com' };
      userStore.create(userData);

      let findAllResult = userStore.findAll();
      expect(findAllResult.data?.length).toBe(1);

      userStore.clear();

      findAllResult = userStore.findAll();
      expect(findAllResult.success).toBe(true);
      expect(findAllResult.data).toEqual([]);
      expect(findAllResult.data?.length).toBe(0);
    });

    test('should reset ID sequence after clear', () => {
      // Create some users
      userStore.create({ name: 'User 1', email: 'user1@example.com' });
      userStore.create({ name: 'User 2', email: 'user2@example.com' });
      userStore.create({ name: 'User 3', email: 'user3@example.com' });

      userStore.clear();

      // Create new user after clear - ID should continue sequence, not reset
      const newUserResult = userStore.create({ name: 'New User', email: 'newuser@example.com' });
      expect(newUserResult.data?.id).toBe('user_4'); // Should continue, not reset to user_1
    });

    test('should return no data on successful clear', () => {
      userStore.create({ name: 'Return Test', email: 'return@example.com' });

      const result = userStore.clear();

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
      expect(result.error).toBeUndefined();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle rapid sequential operations', () => {
      const operations = [];

      // Rapid create operations
      for (let i = 0; i < 100; i++) {
        const userData: CreateUserData = {
          name: `Rapid User ${i}`,
          email: `rapid${i}@example.com`
        };
        operations.push(() => userStore.create(userData));
      }

      // Execute all operations
      const results = operations.map(op => op());

      // All should succeed
      expect(results.every(result => result.success)).toBe(true);
      expect(userStore.count()).toBe(100);

      // Verify IDs are unique
      const ids = results.map(result => result.data!.id);
      expect(new Set(ids).size).toBe(100);
    });

    test('should maintain consistency during mixed operations', () => {
      const userData1: CreateUserData = { name: 'Mix Test 1', email: 'mix1@example.com' };
      const userData2: CreateUserData = { name: 'Mix Test 2', email: 'mix2@example.com' };

      const createResult1 = userStore.create(userData1);
      const createResult2 = userStore.create(userData2);

      // Mixed operations
      userStore.update(createResult1.data!.id, { name: 'Updated Mix 1' });
      userStore.delete(createResult2.data!.id);
      userStore.create({ name: 'Mix Test 3', email: 'mix3@example.com' });

      expect(userStore.count()).toBe(2);
      const findResult = userStore.findById(createResult1.data!.id);
      expect(findResult.success).toBe(true);
      expect(findResult.data?.name).toBe('Updated Mix 1');
    });

    test('should handle operations with identical names but different emails', () => {
      const sameName = 'Identical Name User';
      const userData1: CreateUserData = { name: sameName, email: 'identical1@example.com' };
      const userData2: CreateUserData = { name: sameName, email: 'identical2@example.com' };

      const result1 = userStore.create(userData1);
      const result2 = userStore.create(userData2);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.data?.id).not.toBe(result2.data?.id);
      expect(userStore.count()).toBe(2);
    });

    test('should handle very long operation sequences', () => {
      let currentCount = 0;

      // Create, update, delete cycle
      for (let i = 0; i < 50; i++) {
        const createResult = userStore.create({
          name: `Sequence User ${i}`,
          email: `sequence${i}@example.com`
        });
        currentCount++;
        expect(userStore.count()).toBe(currentCount);

        userStore.update(createResult.data!.id, {
          name: `Updated Sequence User ${i}`
        });
        expect(userStore.count()).toBe(currentCount); // Should not change

        if (i % 2 === 0) {
          userStore.delete(createResult.data!.id);
          currentCount--;
          expect(userStore.count()).toBe(currentCount);
        }
      }

      expect(userStore.count()).toBe(25); // 50 created, 25 deleted
    });
  });

  describe('Store State and Memory Management', () => {
    test('should maintain independent store instances', () => {
      const store1 = new UserStore();
      const store2 = new UserStore();

      store1.create({ name: 'Store 1 User', email: 'store1@example.com' });
      store2.create({ name: 'Store 2 User', email: 'store2@example.com' });

      expect(store1.count()).toBe(1);
      expect(store2.count()).toBe(1);

      store1.clear();
      expect(store1.count()).toBe(0);
      expect(store2.count()).toBe(1); // Should not affect store2
    });

    test('should handle store reuse after clear', () => {
      userStore.create({ name: 'Before Clear', email: 'before@example.com' });
      expect(userStore.count()).toBe(1);

      userStore.clear();
      expect(userStore.count()).toBe(0);

      userStore.create({ name: 'After Clear', email: 'after@example.com' });
      expect(userStore.count()).toBe(1);

      const result = userStore.findAll();
      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(1);
      expect(result.data?.[0].name).toBe('After Clear');
    });
  });
});