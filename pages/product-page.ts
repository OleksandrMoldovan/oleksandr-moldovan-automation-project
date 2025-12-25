import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  
  productName: Locator;
  unitPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;
  productAddedContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = this.page.locator('[data-test="product-name"]');
    this.unitPrice = this.page.locator('[data-test="unit-price"]');
    this.addToCart = this.page.locator('#btn-add-to-cart');
    this.addToFavorites = this.page.locator('#btn-add-to-favorites');
    this.productAddedContainer = this.page.locator('#toast-container');

  }

}
