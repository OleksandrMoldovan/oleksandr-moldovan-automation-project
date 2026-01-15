import { Locator, Page } from '@playwright/test';
export class Header{
  page: Page;
  
  header: Locator;
  home: Locator;
  categories: Locator;
  contact: Locator;
  signIn: Locator;
  languageSwitcher: Locator;
  cartBadge: Locator;
  cart: Locator;
  menu: Locator;
  constructor(page: Page) {
    this.page = page;
    this.header = this.page.locator('app-header');
    this.home = this.page.getByTestId('nav-home');
    this.menu = this.page.getByTestId('nav-menu');
    this.categories = this.page.getByTestId('nav-categories');
    this.contact = this.page.getByTestId('nav-contact');
    this.signIn = this.page.getByTestId('nav-sign-in');
    this.languageSwitcher = this.page.locator('.btn-group dropdown');
    //this.cart = this.page.locator('[data-icon="cart-shopping"]');
    this.cart = this.page.getByTestId('nav-cart');
    this.cartBadge = this.page.getByTestId('cart-quantity');
  }

}
