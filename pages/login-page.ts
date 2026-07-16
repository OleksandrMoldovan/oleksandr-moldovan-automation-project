import { Page, Locator, Response } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage{
  emailLocator: Locator; 
  passwordLocator: Locator; 
  submitBtnLocator: Locator;
  loginPageUrl: string;

  constructor(page: Page) {
    super(page);
    this.emailLocator = this.page.locator('#email');
    this.passwordLocator = this.page.locator('#password');
    this.submitBtnLocator = this.page.locator('.btnSubmit');
    this.loginPageUrl = '/auth/login';
    
  }

  async performLogin(email: string, password: string): Promise<Response | undefined> {
    let authenticationResponse: Response | undefined;
    const captureAuthenticationResponse = (response: Response) => {
      const isLoginRequest = response.request().method() === 'POST'
        && new URL(response.url()).pathname.endsWith('/users/login');

      if (isLoginRequest) {
        authenticationResponse = response;
      }
    };

    this.page.on('response', captureAuthenticationResponse);
    await this.emailLocator.fill(email);
    await this.passwordLocator.fill(password);

    try {
      await Promise.all([
        this.page.waitForURL(url => !url.toString().includes('/auth/login'), { timeout: 15_000 }),
        this.submitBtnLocator.click(),
      ]);
    } finally {
      this.page.off('response', captureAuthenticationResponse);
    }

    return authenticationResponse;
  }
}
