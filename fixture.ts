import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/login-page';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    //set up
    console.log('Before');
    const loginPage = new LoginPage(page);
    const password: string = 'welcome01';
    const email: string = 'customer@practicesoftwaretesting.com';

    await loginPage.navigate();
    await loginPage.performLogin(email,password);

    //use fixtures values
    await use(page);
    console.log('After');
    //clean up
  },
});
