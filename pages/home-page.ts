import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortProducts } from '../components/sorting-panel';
import { FilterPanel } from '../components/filter-panel';
import {  generateProducts } from '../additional-scripts/mock-product-data-generator';
import { productToVerify } from '../tests/data/home-page';

export class HomePage extends BasePage {
  readonly productTitles: Locator;
  readonly sortPanel: SortProducts;
  readonly filterPanel: FilterPanel;
  readonly productPrices: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles = this.page.getByTestId('product-name');
    this.productPrices = this.page.getByTestId('product-price');
    this.productCards = this.page.locator('a[data-test^="product-"]');
    this.sortPanel = new SortProducts(page);
    this.filterPanel = new FilterPanel(page);
  }
  async clickProduct(productNameToNavigate: string) {
    
    await this.page.locator(`.card-img-top[alt = '${productNameToNavigate}']`).click();
  }

  async getProductTitles(): Promise<string[]> {
    const titles = await this.productTitles.allTextContents();

    return titles.map(t => t.trim()).filter(Boolean);
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.productPrices.allTextContents();

    return raw.map(v => Number(v.replace(/[^0-9.]/g, '')));

  }
  async openSpecifiedProduct(productNumber: number){
    await this.page.locator(`a.card:nth-child(${productNumber})`).click();
  }

  async mockProducts(productAmount: number): Promise<void> {
    await this.page.route('**/products*', async (route) => {
      const response = await route.fetch();
      const json = await response.json();

      const trimmed = generateProducts(productAmount);

      await route.fulfill({
        json: {
          ...json,
          data: trimmed,
          total: productAmount,
          from: 1,
          to: trimmed.length,
          current_page: 1,
          last_page: 1,
          per_page: productAmount,
        },
      });
    });
  }

  async isProductVisible(){
    
    for (let i = 0; i < productToVerify; i++) {
      await this.productCards.nth(i).toBeVisible();
    }
  
  }

}
