import {  Page } from '@playwright/test';

export class FilterPanel{

  private readonly page: Page;

  constructor(page: Page){  
    this.page = page;
  }
  async checkFilter(filterOption: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: filterOption, exact: true }).check(); 
  }
}
