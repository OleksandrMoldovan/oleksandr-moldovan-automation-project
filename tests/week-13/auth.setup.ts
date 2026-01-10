import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/login-page';

const authAdmin = path.join(__dirname, 'playwright/.auth/admin.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate('/auth/login');

  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await page.context().storageState({ path: authAdmin });
});
