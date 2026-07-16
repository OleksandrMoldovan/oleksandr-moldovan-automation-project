import { test as base } from '@playwright/test';
import { authStatePath } from './config/paths';
import { AllPages } from './pages/all-pages';

type MyFixtures = {
  loggedInPage: AllPages;
  allPages: AllPages;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ browser, contextOptions }, use) => {
    const context = await browser.newContext({
      ...contextOptions,
      storageState: authStatePath,
    });
    const page = await context.newPage();
    const authedPages = new AllPages(page);

    await use(authedPages);
    await context.close();
  },
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);

    await use(allPages);
  },
});
