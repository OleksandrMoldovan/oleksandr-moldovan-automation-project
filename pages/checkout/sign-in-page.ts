import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class SignInPage extends BasePage{
  loginButton: Locator;
  proceedToCheckoutButton: Locator;
  constructor(page: Page){
    super(page);
    this.loginButton = this.page.getByTestId('login-submit');
    this.proceedToCheckoutButton = this.page.getByTestId('proceed-2');

  }
  
}
