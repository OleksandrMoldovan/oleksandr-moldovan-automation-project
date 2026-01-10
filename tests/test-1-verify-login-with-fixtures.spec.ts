import { expect } from '@playwright/test';
import { AccountPage } from '../pages/my-account-page';
import { test } from '../fixture';

test('Logged in Admin user is able to navigate the account page', async ({ loginPage,accountPage,page }) => {

  const name = 'Jane Doe';
  const titleText = 'My account';

  await accountPage.navigate('/account');
  await loginPage.performLogin('customer@practicesoftwaretesting.com','welcome01');

  await expect(accountPage.page).toHaveURL('/account');

  await expect(accountPage.titleLocator).toHaveText(titleText);

  await expect(page.locator('a#menu')).toHaveText(name);
});
