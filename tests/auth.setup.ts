import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login-page';
import { credentials } from './data/user-creds';

const authAdmin = path.join(__dirname, 'playwright/.auth/admin.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate('/auth/login');

  await loginPage.performLogin(credentials.customer.email, credentials.customer.password);

  await page.context().storageState({ path: authAdmin });
});
