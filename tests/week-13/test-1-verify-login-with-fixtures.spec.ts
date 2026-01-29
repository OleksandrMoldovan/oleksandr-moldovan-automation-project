import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { credentials } from '../data/user-creds';

test('Logged in Admin user is able to navigate the account page', async ({ allPages }) => {

  const titleText = 'My account';

  await allPages.accountPage.navigate('/account');
  await allPages.loginPage.performLogin('customer@practicesoftwaretesting.com','welcome01');

  await expect(allPages.accountPage.page).toHaveURL('/account');

  await expect(allPages.accountPage.titleLocator).toHaveText(titleText);

  await expect(allPages.accountPage.header.menu).toHaveText(credentials.customer1.name);
});
