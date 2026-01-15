import { Page } from '@playwright/test';
import { Header } from '../components/header';

export class BasePage {
  page: Page;
  readonly header: Header;
  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
  }

  async navigate(url: string = ''){
    await this.page.goto(url);
  };

  // async authenticateWithToken(token: string): Promise<void> {
  //   await this.page.goto();
  //   await this.page.evaluate((t) => {
  //     localStorage.setItem('auth-token', t);
  //   }, token);
  //   await this.page.reload();
  // }
}
