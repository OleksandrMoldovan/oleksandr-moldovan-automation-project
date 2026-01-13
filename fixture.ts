import { test as base, expect,Page } from '@playwright/test';
import { AllPages } from './pages/all-pages';
//import { credentials } from './tests/data/user-creds'; ---- part related to commented example

type MyFixtures = {
  loggedInPage: AllPages;
  allPages: AllPages
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ browser }, use) => {
    //set up
    const context = await browser.newContext({ storageState: 'playwright/.auth/e2e-user.json' });

    const page = await context.newPage();
    const authedPages = new AllPages(page);

    //use fixtures values
    await use(authedPages);

    await context.close();
    //clean up
  },
  
  allPages:async({ page },use) => {
  
    const allPages = new AllPages(page);

    await use(allPages);
  },
});

/// left it as example
// export const test = base.extend<MyFixtures>({
//   loggedInPage: async ({ allPages }, use) => {
//     //set up
//     console.log('Before');

//     await allPages.loginPage.navigate('/auth/login');
//     await allPages.loginPage.performLogin(credentials.customer.email,credentials.customer.password);

//     //use fixtures values
//     await use(allPages);
//     console.log('After');
//     //clean up
//   },
