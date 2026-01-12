import { Locator, Page } from '@playwright/test';
import { SortTitles, SortPrices } from '../tests/data/sorting-options';

export class SortProducts {
  private readonly page: Page;
  private readonly sortDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropDown = this.page.getByTestId('sort');
  }

  async sortByTitle(option: SortTitles) {
    await this.sortDropDown.selectOption(option);
  }
  async sortByPrice(option: SortPrices) {
    await this.sortDropDown.selectOption(option);
  }
}
