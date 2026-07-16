import { test as setup } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { authStatePath } from '../../config/paths';
import { getTestUser } from '../../config/environment';
import { LoginPage } from '../../pages/login-page';

setup('authenticate test user', async ({ page }) => {
  const user = getTestUser();
  const loginPage = new LoginPage(page);

  await mkdir(dirname(authStatePath), { recursive: true });
  await loginPage.navigateToLoginPage();
  await loginPage.performLogin(user.email, user.password);
  await page.waitForURL(/\/account/);
  await page.context().storageState({ path: authStatePath });
});
