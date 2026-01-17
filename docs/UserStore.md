# UserStore

The `UserStore` class provides in-memory user management with full CRUD operations and proper error handling.

## Usage

```typescript
import { UserStore, CreateUserData, UpdateUserData } from 'conductor-test';

// Create a new store instance
const userStore = new UserStore();

// Create a user
const userData: CreateUserData = {
  name: 'John Doe',
  email: 'john@example.com'
};

const result = userStore.create(userData);
if (result.success) {
  console.log('Created user:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## API Reference

### `create(userData: CreateUserData): UserOperationResult<User>`

Creates a new user with automatically generated ID and creation timestamp.

**Parameters:**
- `userData`: Object containing `name` and `email` (both required)

**Returns:**
- Success: `{ success: true, data: User }`
- Error: `{ success: false, error: string }`

**Validation:**
- Name and email are required
- Email must be unique across all users

### `findById(id: string): UserOperationResult<User>`

Finds a user by their unique ID.

**Parameters:**
- `id`: User ID string (required)

**Returns:**
- Success: `{ success: true, data: User }`
- Error: `{ success: false, error: string }`

### `findAll(): UserOperationResult<User[]>`

Retrieves all users from the store.

**Returns:**
- Success: `{ success: true, data: User[] }`
- Error: `{ success: false, error: string }`

### `update(id: string, updates: UpdateUserData): UserOperationResult<User>`

Updates an existing user with partial data.

**Parameters:**
- `id`: User ID string (required)
- `updates`: Object containing optional `name` and/or `email`

**Returns:**
- Success: `{ success: true, data: User }`
- Error: `{ success: false, error: string }`

**Validation:**
- User must exist
- Email must be unique if being updated

### `delete(id: string): UserOperationResult<void>`

Deletes a user from the store.

**Parameters:**
- `id`: User ID string (required)

**Returns:**
- Success: `{ success: true }`
- Error: `{ success: false, error: string }`

### `count(): number`

Returns the total number of users in the store.

**Returns:** Number of users

### `clear(): UserOperationResult<void>`

Removes all users from the store.

**Returns:**
- Success: `{ success: true }`
- Error: `{ success: false, error: string }`

## Error Handling

All operations return a `UserOperationResult<T>` which contains:
- `success`: Boolean indicating operation success
- `data`: The result data (only present on success)
- `error`: Error message string (only present on failure)

This pattern allows for consistent error handling across all operations:

```typescript
const result = userStore.create(userData);
if (result.success) {
  // Handle success - result.data is guaranteed to be present
  console.log(result.data.id);
} else {
  // Handle error - result.error is guaranteed to be present
  console.error(result.error);
}
```

## ID Generation

User IDs are automatically generated using an incremental pattern: `user_1`, `user_2`, etc. IDs are guaranteed to be unique within a single UserStore instance.

## Thread Safety

The UserStore class is **not thread-safe**. If you need to use it in a multi-threaded environment, you'll need to implement your own synchronization mechanism.