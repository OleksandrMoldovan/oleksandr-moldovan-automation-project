import { test as base } from '@playwright/test';
import { AllPages } from './pages/all-pages';

type MyFixtures = {
  loggedInPage: AllPages;
  allPages: AllPages;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const authedPages = new AllPages(page);

    await use(authedPages);
  },
  allPages: async ({ page }, use) => {
    const allPages = new AllPages(page);

    await use(allPages);
  },
});
