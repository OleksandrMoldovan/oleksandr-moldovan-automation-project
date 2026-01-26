import {  expect } from '@playwright/test';
import { test } from '../../fixture';

test('UI login via API token', async ({ allPages,request }) => {
  const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    },
  });

  expect(response.ok()).toBeTruthy();

  const jsonBody = await response.json();
  const token = jsonBody.access_token;

  await allPages.basePage.authenticateWithToken(token);
  
  await expect(allPages.homePage.header.menu).toContainText('Jane Doe');
});
