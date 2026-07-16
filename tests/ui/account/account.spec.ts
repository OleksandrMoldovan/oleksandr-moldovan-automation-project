import { expect } from '@playwright/test';
import { getTestUser } from '../../../config/environment';
import { test } from '../../../fixture';

test('authenticated user can open their account', { tag: '@smoke' }, async ({ loggedInPage }) => {
  const user = getTestUser();

  await loggedInPage.accountPage.navigate('/account');

  await expect(loggedInPage.accountPage.page).toHaveURL('/account');
  await expect(loggedInPage.accountPage.titleLocator).toHaveText('My account');
  await expect(loggedInPage.accountPage.header.menu).toHaveText(user.name);
});
