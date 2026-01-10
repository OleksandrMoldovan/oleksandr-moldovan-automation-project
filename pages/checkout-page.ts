import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class CheckoutPage extends BasePage{
  cartQuantity: Locator;
  productTitle: Locator;
  proceedToCheckoutButton: Locator;
  constructor(page: Page){
    super(page);
    this.cartQuantity = this.page.getByTestId('product-quantity'); 
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedToCheckoutButton = this.page.getByTestId('proceed-1');
  }
  
}
