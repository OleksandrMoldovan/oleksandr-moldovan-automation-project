import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/login-page';
import { credentials } from '../../tests/data/user-creds';
const e2eUser = path.join(process.cwd(), 'playwright/.auth/e2e-user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate('/auth/login');

  await loginPage.performLogin(credentials.customer1.email, credentials.customer1.password);

  await page.context().storageState({ path: e2eUser });
});
