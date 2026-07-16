import { expect } from '@playwright/test';
import { getTestUser } from '../../../config/environment';
import type { LoginAttempt } from '../../../pages/login-page';
import { test } from '../../../fixture';

async function createLoginFailure(
  error: unknown,
  loginAttempt: LoginAttempt,
): Promise<Error> {
  const transitionDiagnostics = await loginAttempt.transitionDiagnostics.complete();
  const message = error instanceof Error ? error.message : String(error);

  return new Error(
    `${message}\nLogin response: ${loginAttempt.responseDiagnostics}\n${transitionDiagnostics}`,
  );
}

test('user can sign in with valid credentials', { tag: '@regression' }, async ({ allPages }) => {
  const user = getTestUser();

  await allPages.loginPage.navigateToLoginPage();
  const loginAttempt = await allPages.loginPage.performLogin(user.email, user.password);

  try {
    await expect(allPages.loginPage.page, loginAttempt.responseDiagnostics).toHaveURL(/\/account/);
    await expect(allPages.loginPage.header.menu, loginAttempt.responseDiagnostics)
      .toHaveText(user.name);
  } catch (error: unknown) {
    throw await createLoginFailure(error, loginAttempt);
  }

  await loginAttempt.transitionDiagnostics.complete();
});
