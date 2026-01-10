import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
// import { LoginPage } from '../pages/login-page'

export class AccountPage extends BasePage {
  
  titleLocator: Locator; 
  
  constructor(page: Page) {
    super(page);
    this.titleLocator = this.page.getByTestId('page-title');
  }
}
