import { test as base, Page } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { AccountPage } from './pages/my-account-page';

type MyFixtures = {
  loggedInPage: Page;
  accountPage: AccountPage
  loginPage: LoginPage
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    //set up
    console.log('Before');
    const loginPage = new LoginPage(page);

    await loginPage.navigate('/auth/login');
    const password: string = 'welcome01';
    const email: string = 'customer@practicesoftwaretesting.com';

    await loginPage.performLogin(email,password);

    //use fixtures values
    await use(page);
    console.log('After');
    //clean up
  },
  loginPage:async({ page },use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  
  },
  accountPage:async({ page },use)=>{
    const accountPage = new AccountPage(page);

    await use(accountPage);
  },
});
