import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortProducts,FilterPanel } from '../components/filter-sorting-panel';

export class HomePage extends BasePage {
  readonly productTitles: Locator;
  readonly sortPanel: SortProducts;
  readonly filterPanel: FilterPanel;

  constructor(page: Page) {
    super(page);
    this.productTitles = this.page.locator('[data-test="product-name"]');
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
}
