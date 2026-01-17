import { UserStore } from '../src/stores/UserStore.js';
import { CreateUserData, UpdateUserData } from '../src/types/user.js';

/**
 * Example demonstrating how to use the UserStore class
 */
function userStoreExample() {
  // Create a new UserStore instance
  const userStore = new UserStore();

  console.log('=== UserStore Example ===\n');

  // Create some users
  console.log('1. Creating users...');
  const user1Data: CreateUserData = {
    name: 'Alice Johnson',
    email: 'alice@example.com'
  };

  const user2Data: CreateUserData = {
    name: 'Bob Smith',
    email: 'bob@example.com'
  };

  const createResult1 = userStore.create(user1Data);
  const createResult2 = userStore.create(user2Data);

  if (createResult1.success && createResult2.success) {
    console.log(`✓ Created user: ${createResult1.data?.name} (ID: ${createResult1.data?.id})`);
    console.log(`✓ Created user: ${createResult2.data?.name} (ID: ${createResult2.data?.id})`);
  }

  console.log(`\nTotal users: ${userStore.count()}\n`);

  // Find a user by ID
  console.log('2. Finding user by ID...');
  const userId = createResult1.data?.id!;
  const findResult = userStore.findById(userId);

  if (findResult.success) {
    console.log(`✓ Found user: ${findResult.data?.name} - ${findResult.data?.email}`);
  }

  // Find all users
  console.log('\n3. Finding all users...');
  const allUsersResult = userStore.findAll();

  if (allUsersResult.success) {
    console.log(`✓ Found ${allUsersResult.data?.length} users:`);
    allUsersResult.data?.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Created: ${user.createdAt.toISOString()}`);
    });
  }

  // Update a user
  console.log('\n4. Updating user...');
  const updates: UpdateUserData = {
    name: 'Alice Johnson-Smith',
    email: 'alice.johnson.smith@example.com'
  };

  const updateResult = userStore.update(userId, updates);

  if (updateResult.success) {
    console.log(`✓ Updated user: ${updateResult.data?.name} - ${updateResult.data?.email}`);
  }

  // Try to create a user with duplicate email (should fail)
  console.log('\n5. Testing duplicate email validation...');
  const duplicateEmailData: CreateUserData = {
    name: 'Charlie Brown',
    email: 'alice.johnson.smith@example.com' // Same as updated Alice
  };

  const duplicateResult = userStore.create(duplicateEmailData);

  if (!duplicateResult.success) {
    console.log(`✗ Expected error: ${duplicateResult.error}`);
  }

  // Delete a user
  console.log('\n6. Deleting user...');
  const user2Id = createResult2.data?.id!;
  const deleteResult = userStore.delete(user2Id);

  if (deleteResult.success) {
    console.log(`✓ Deleted user with ID: ${user2Id}`);
    console.log(`Remaining users: ${userStore.count()}`);
  }

  // Try to find deleted user (should fail)
  console.log('\n7. Testing user not found...');
  const notFoundResult = userStore.findById(user2Id);

  if (!notFoundResult.success) {
    console.log(`✗ Expected error: ${notFoundResult.error}`);
  }

  // Clear all users
  console.log('\n8. Clearing all users...');
  const clearResult = userStore.clear();

  if (clearResult.success) {
    console.log(`✓ Cleared all users. Remaining count: ${userStore.count()}`);
  }

  console.log('\n=== Example Complete ===');
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  userStoreExample();
}

export { userStoreExample };