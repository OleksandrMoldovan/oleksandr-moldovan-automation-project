import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { credentials } from '../data/user-creds';

test('Logged in Admin user is able to navigate the account page', { tag:'@smoke' }, async ({ loggedInPage }) => {
  
  const titleText = 'My account';

  await test.step('Navigate to the account page', async () => {
    await loggedInPage.accountPage.navigate('/account');
  });

  await test.step('Check that url is correct', async () => {
    await expect(loggedInPage.accountPage.page).toHaveURL('/account');
  });

  await test.step('Check that title contains correct text', async () => {
    await expect(loggedInPage.accountPage.titleLocator).toHaveText(titleText);

  });

  await expect(loggedInPage.accountPage.header.menu).toHaveText(credentials.customer1.name);
});
