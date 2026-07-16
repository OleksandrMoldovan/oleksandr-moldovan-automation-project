import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/auth-client';
import { getTestUser } from '../../config/environment';

test('login API returns an access token for valid credentials', { tag: '@smoke' }, async ({ request }) => {
  const user = getTestUser();
  const token = await new AuthClient(request).loginAndGetToken(user.email, user.password);

  expect(token).not.toHaveLength(0);
});

test('login API rejects invalid credentials', { tag: '@regression' }, async ({ request }) => {
  const response = await new AuthClient(request).login('invalid@example.com', 'invalid-password');

  expect(response.ok()).toBe(false);
  expect(response.status()).toBeGreaterThanOrEqual(400);
  expect(response.status()).toBeLessThan(500);
});
