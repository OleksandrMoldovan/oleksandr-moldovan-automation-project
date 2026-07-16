import { Locator, Page } from '@playwright/test';
import { SortPrices, SortTitles } from '../test-data/catalog';

export class SortProducts {
  private readonly sortDropDown: Locator;

  constructor(page: Page) {
    this.sortDropDown = page.getByTestId('sort');
  }

  async sortByTitle(option: SortTitles): Promise<void> {
    await this.sortDropDown.selectOption(option);
  }
  async sortByPrice(option: SortPrices): Promise<void> {
    await this.sortDropDown.selectOption(option);
  }
}
