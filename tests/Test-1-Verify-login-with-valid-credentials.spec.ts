import { expect, test } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/my-account-page';

test.use({ storageState:'playwright/.auth/admin.json' });

test('Logged in Admin user is able to navigate the account page', async ({ page }) => {
  const accountPage = new AccountPage(page);

  await accountPage.navigate('/account');

  await expect(accountPage.page).toHaveURL('/account');

  await expect(accountPage.titleLocator).toHaveText('My account');

  await expect(page.locator('a#menu')).toHaveText('Jane Doe');
});

// test('Verify login with valid credentials', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.navigate('/auth/login');

//   await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  
//   //accountPage

//   const accountPage = new AccountPage(page);

//   await expect(accountPage.page).toHaveURL('/account');

//   await expect(accountPage.titleLocator).toHaveText('My account');

//   await expect(page.locator('a#menu')).toHaveText('Jane Doe');
// });
