import { test, expect } from '@playwright/test';

test('UI login via API token', async ({ page, request }) => {
  const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    },
  });

  expect(response.ok()).toBeTruthy();

  const jsonBody = await response.json();
  const token = jsonBody.access_token;

  await page.goto('/');
  await page.evaluate((t) => {
    localStorage.setItem('auth-token', t);
  }, token);

  await page.reload();

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});
