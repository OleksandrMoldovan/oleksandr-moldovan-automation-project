import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  
  productName: Locator;
  unitPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;
  productAddedMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = this.page.getByTestId('product-name');
    this.unitPrice = this.page.getByTestId('unit-price');
    this.addToCart = this.page.locator('#btn-add-to-cart');
    this.addToFavorites = this.page.locator('#btn-add-to-favorites');
    this.productAddedMessage = this.page.locator('#toast-container').getByRole('alert');//create indep component for it

  }

}
