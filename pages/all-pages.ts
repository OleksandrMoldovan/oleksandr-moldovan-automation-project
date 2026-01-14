import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartPage } from './checkout/cart-page';
import { LoginPage } from './login-page';
import { HomePage } from './home-page';
import { AccountPage } from './my-account-page';
import { ProductPage } from './product-page';
import { SignInPage } from './checkout/sign-in-page';
import { PaymentPage } from './checkout/payment-page';
import { BillingPage } from './checkout/billing-page';

export class AllPages{
  page: Page;
  basePage: BasePage;
  loginPage: LoginPage;
  cartPage: CartPage;
  homePage: HomePage;
  accountPage: AccountPage;
  productPage: ProductPage;
  signInPage: SignInPage;
  paymentPage: PaymentPage;
  billingPage: BillingPage;
  constructor(page: Page){
    this.page = page;
    this.basePage = new BasePage(page);
    this.loginPage = new LoginPage(page);
    this.cartPage = new CartPage(page);
    this.homePage = new HomePage(page);
    this.accountPage = new AccountPage(page);
    this.productPage = new ProductPage(page);
    this.signInPage = new SignInPage(page);
    this.paymentPage = new PaymentPage(page);
    this.billingPage = new BillingPage(page);
  };

}
