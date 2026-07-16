import { expect } from '@playwright/test';
import { getTestUser } from '../../../config/environment';
import { test } from '../../../fixture';

test('user can sign in with valid credentials', { tag: '@regression' }, async ({ allPages }) => {
  const user = getTestUser();

  await allPages.loginPage.navigate(allPages.loginPage.loginPageUrl);
  await allPages.loginPage.performLogin(user.email, user.password);

  await expect(allPages.loginPage.page).toHaveURL(/\/account/);
  await expect(allPages.loginPage.header.menu).toHaveText(user.name);
});
