import { Page } from '@playwright/test';

export class BasePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string = ''){
    await this.page.goto(url);
  };
}
