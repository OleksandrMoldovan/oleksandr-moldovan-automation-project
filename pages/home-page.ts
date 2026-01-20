import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortProducts } from '../components/sorting-panel';
import { FilterPanel } from '../components/filter-panel';

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
    this.productCards = this.page.locator('a.card');
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
  //commented WIP I i thougth that this option is correct
  // async mockProducts(productAmount: number): Promise<void> {
  //   await this.page.route('**/products*', async (route) => {
  //     const response = await route.fetch();
  //     const json = await response.json();

  //     const trimmed = json.data.slice(0, productAmount);

  //     await route.fulfill({
  //       json: {
  //         ...json,
  //         data: trimmed,
  //         total: productAmount,
  //         from: 1,
  //         to: productAmount,
  //         current_page: 1,
  //         last_page: 1,
  //         per_page: productAmount,
  //       },
  //     });
  //   });
  // }
  // async openFirstProduct(){
  //   await this.page.locator('a.card:nth-child(1)').click();
  // }

  async mockProducts(productAmount: number): Promise<void> {
    await this.page.route('https://api.practicesoftwaretesting.com/products*', async (route) => {
      const response = await route.fetch();
      const json = await response.json();

      const trimmed = json.data.slice(0, productAmount);

      await route.fulfill({ response, json });
    });
  }

}
