import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
export class HomePage extends BasePage {
  titleLocator: Locator; 
  
  constructor(page: Page) {
    super(page);
    this.titleLocator = this.page.locator('[data-test ="page-title"]');
  }

  async clickProduct(productNameToNavigate: string) {
    
    await this.page.locator(`.card-img-top[alt = '${productNameToNavigate}']`).click();
  }
}
