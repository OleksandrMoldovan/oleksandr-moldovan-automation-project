import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Logged in Admin user is able to navigate the account page', async ({ allPages }) => {

  const name = 'Jane Doe';
  const titleText = 'My account';

  await allPages.accountPage.navigate('/account');
  await allPages.loginPage.performLogin('customer@practicesoftwaretesting.com','welcome01');

  await expect(allPages.accountPage.page).toHaveURL('/account');

  await expect(allPages.accountPage.titleLocator).toHaveText(titleText);

  await expect(allPages.accountPage.page.locator('a#menu')).toHaveText(name);
});
