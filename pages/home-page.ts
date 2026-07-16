import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortingPanel } from '../components/sorting-panel';
import { FilterPanel } from '../components/filter-panel';
import { createMockProducts } from '../test-data/mock-products';

interface ProductSummary {
  name: string;
  price: string;
}

export class HomePage extends BasePage {
  readonly productTitles: Locator;
  readonly sortPanel: SortingPanel;
  readonly filterPanel: FilterPanel;
  readonly productPrices: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles = this.page.getByTestId('product-name');
    this.productPrices = this.page.getByTestId('product-price');
    this.productCards = this.page.locator('a[data-test^="product-"]');
    this.sortPanel = new SortingPanel(page);
    this.filterPanel = new FilterPanel(page);
  }
  async getFirstProductSummary(): Promise<ProductSummary> {
    const card = this.productCards.first();

    return {
      name: (await card.getByTestId('product-name').innerText()).trim(),
      price: (await card.getByTestId('product-price').innerText()).replace(/[^0-9.]/g, ''),
    };
  }

  async openFirstProduct(): Promise<void> {
    await this.productCards.first().click();
  }

  async getProductTitles(): Promise<string[]> {
    const titles = await this.productTitles.allTextContents();

    return titles.map(t => t.trim()).filter(Boolean);
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.productPrices.allTextContents();

    return raw.map(v => Number(v.replace(/[^0-9.]/g, '')));

  }
  async mockProducts(productAmount: number): Promise<void> {
    const products = createMockProducts(productAmount);

    // Fulfill directly so the mock remains deterministic and independent of the live API.
    await this.page.route('**/products*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          data: products,
          total: productAmount,
          from: 1,
          to: products.length,
          current_page: 1,
          last_page: 1,
          per_page: productAmount,
        },
      });
    });
  }

}
