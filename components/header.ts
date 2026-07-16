import { Locator, Page } from '@playwright/test';
export class Header{
  cartBadge: Locator;
  cart: Locator;
  menu: Locator;
  constructor(page: Page) {
    this.menu = page.getByTestId('nav-menu');
    this.cart = page.getByTestId('nav-cart');
    this.cartBadge = page.getByTestId('cart-quantity');
  }

}
