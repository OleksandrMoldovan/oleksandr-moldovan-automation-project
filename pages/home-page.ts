import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortProducts } from '../components/sorting-panel';
import { FilterPanel } from '../components/filter-panel';

export class HomePage extends BasePage {
  readonly productTitles: Locator;
  readonly sortPanel: SortProducts;
  readonly filterPanel: FilterPanel;
  readonly productPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitles = this.page.getByTestId('product-name');
    this.productPrices = this.page.getByTestId('product-price');
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
  async openFirstProduct(){
    await this.page.locator('a.card:nth-child(1)').click();
  }

}
