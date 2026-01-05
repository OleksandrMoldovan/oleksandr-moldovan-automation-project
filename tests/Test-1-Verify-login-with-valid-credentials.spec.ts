import { expect, test } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/my-account-page';

test.use({ storageState:'playwright/.auth/admin.json' });

test('Logged in Admin user is able to navigate the account page', async ({ page }) => {
  
  const accountPage = new AccountPage(page);
  const name = 'Jane Doe';
  const titleText = 'My account';

  await accountPage.navigate('/account');

  await expect(accountPage.page).toHaveURL('/account');

  await expect(accountPage.titleLocator).toHaveText(titleText);

  await expect(page.locator('a#menu')).toHaveText(name);
});
