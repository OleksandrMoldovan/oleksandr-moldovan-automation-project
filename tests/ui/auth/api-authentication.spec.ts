import { expect } from '@playwright/test';
import { AuthClient } from '../../../api/auth-client';
import { getTestUser } from '../../../config/environment';
import { test } from '../../../fixture';

test('API token establishes a browser session', { tag: '@regression' }, async ({ allPages, request }) => {
  const user = getTestUser();
  const token = await new AuthClient(request).loginAndGetToken(user.email, user.password);

  await allPages.basePage.authenticateWithToken(token);

  await expect(allPages.homePage.header.menu).toHaveText(user.name);
});
