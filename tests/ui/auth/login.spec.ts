import { expect, type Response } from '@playwright/test';
import { formatAuthenticationResponse } from '../../../api/auth-client';
import { getTestUser } from '../../../config/environment';
import { test } from '../../../fixture';

async function getAuthenticationDiagnostics(response: Response | undefined): Promise<string> {
  return response
    ? formatAuthenticationResponse(response)
    : Promise.resolve('No POST response ending in /users/login was observed during UI login.');
}

test('user can sign in with valid credentials', { tag: '@regression' }, async ({ allPages }) => {
  const user = getTestUser();

  await allPages.loginPage.navigate(allPages.loginPage.loginPageUrl);
  const authenticationResponse = await allPages.loginPage.performLogin(user.email, user.password);
  const diagnostics = await getAuthenticationDiagnostics(authenticationResponse);

  await expect(allPages.loginPage.page, diagnostics).toHaveURL(/\/account/);
  await expect(allPages.loginPage.header.menu, diagnostics).toHaveText(user.name);
});
