import { Locator, Page } from '@playwright/test';
import { SortPrices, SortTitles } from '../test-data/catalog';

export class SortProducts {
  private readonly page: Page;
  private readonly sortDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropDown = this.page.getByTestId('sort');
  }

  async sortByTitle(option: SortTitles): Promise<void> {
    await this.sortDropDown.selectOption(option);
  }
  async sortByPrice(option: SortPrices): Promise<void> {
    await this.sortDropDown.selectOption(option);
  }
}
