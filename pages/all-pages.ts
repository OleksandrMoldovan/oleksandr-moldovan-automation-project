import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CheckoutPage } from './checkout-page';
import { LoginPage } from './login-page';
import { HomePage } from './home-page';
import { AccountPage } from './my-account-page';
import { ProductPage } from './product-page';

export class AllPages{
  page: Page;
  basePage: BasePage;
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  accountPage: AccountPage;
  productPage: ProductPage;
  constructor(page: Page){
    this.page = page;
    this.basePage = new BasePage(page);
    this.loginPage = new LoginPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.homePage = new HomePage(page);
    this.accountPage = new AccountPage(page);
    this.productPage = new ProductPage(page);
  };

}
