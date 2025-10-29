
import { test, expect } from '@playwright/test';

test('GET users from JSONPlaceholder', async () => {
  const apiContext = await test.request.newContext();
  const response = await apiContext.get('https://jsonplaceholder.typicode.com/users');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.length).toBeGreaterThan(0);
});


test('Create a new user via POST', async () => {
  const apiContext = await test.request.newContext();

  const response = await apiContext.post('https://jsonplaceholder.typicode.com/users', {
    data: {
          name: 'Billy LZ',
          username: 'BillLZ',
          email: 'Bill@example.com'
    }
  });

  expect(response.status()).toBe(201); // JSONPlaceholder returns 201 for successful POST
  const responseBody = await response.json();

  console.log('Created user:', responseBody);

  expect(responseBody).toHaveProperty('id');
  expect(responseBody).toHaveProperty('name');
  expect(responseBody).toHaveProperty('username');
  expect(responseBody).toHaveProperty('email');
 
});

test('PUT request to update user', async ({request}) => {
  //const apiContext = await request.newContext();

  const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
    data: {
      id: 1,
      name: 'Asiel QA',
      username: 'asielqa',
      email: 'asiel@example.com',
      phone: '123-456-7890',
      website: 'asielqa.dev'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseBody = await response.json();
  console.log('PUT response:', responseBody);

  expect(response.ok()).toBeTruthy();
  expect(responseBody.name).toBe('Asiel QA');
  expect(response.status()).toBe(200)
});

test('GET user with ID 1', async () => {
  const apiContext = await test.request.newContext();
  const response = await apiContext.get('https://jsonplaceholder.typicode.com/users/1');
  expect(response.status()).toBe(200);

  const user = await response.json();
  console.log('Fetched user:', user);

  expect(response.status()).toBe(200)
  expect(user).toMatchObject({
    id: 1,
    name: expect.any(String),
    email: expect.any(String)
  });
});



test('PATCH request to update user name', async ({request}) => {
  //const apiContext = await request.newContext();

  const response = await request.patch('https://jsonplaceholder.typicode.com/users/1', {
    data: {
      name: 'Asiel QA Updated'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseBody = await response.json();
  console.log('PATCH response:', responseBody);

  expect(response.ok()).toBeTruthy();
  expect(responseBody.name).toBe('Asiel QA Updated');
});

test('Delete a user via DELETE', async () => {
  const apiContext = await test.request.newContext();

  const response = await apiContext.delete('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200); // JSONPlaceholder returns 200 for successful DELETE
  const responseBody = await response.json();

  console.log('Deleted user response:', responseBody);

  // JSONPlaceholder returns an empty object for DELETE
  expect(responseBody).toEqual({});
});