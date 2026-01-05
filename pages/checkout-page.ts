import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage extends BasePage{
  cartQuantity: Locator;
  productTitle: Locator;
  proceedToCheckoutButton: Locator;
  constructor(page: Page){
    super(page);
    this.cartQuantity = this.page.locator('[data-test="product-quantity"]');
    this.productTitle = this.page.locator('[data-test="product-title"]');
    this.proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');
  }
  
}
