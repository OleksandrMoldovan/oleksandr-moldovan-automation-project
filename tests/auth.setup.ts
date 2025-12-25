import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';

// I have prepared 2 options for auth. IS IT CORRECT TO DO IN SUCH WAY BECAUSE BOTH OF THEM WORK
//1 OPTION
// const authAdmin = path.join(__dirname, '../playwright/.auth/basicUser.json');

// setup('authenticate', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.navigate('/auth/login');

//   await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

//   await page.context().storageState({ path: authAdmin });
// });
//2 OPTION
const adminFile = 'playwright/.auth/admin.json';

setup('authenticate', async ({ page }) => {
  const emailLocator = '#email';
  const passwordLocator = '#password';
  const email = 'customer@practicesoftwaretesting.com';
  const password = 'welcome01';
  const submitLocator = '.btnSubmit';

  await page.goto('/auth/login');

  await page.locator(emailLocator).fill(email);
  await page.locator(passwordLocator).fill(password);
  await page.locator(submitLocator).click();
  await page.waitForURL('/account'); 

  await page.context().storageState({ path: adminFile });
});
