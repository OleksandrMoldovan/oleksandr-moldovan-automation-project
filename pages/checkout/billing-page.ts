import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class BillingPage extends BasePage{
  state: Locator;
  postalCode: Locator;
  city: Locator;
  proceedToCheckoutButton: Locator;
  constructor(page: Page){
    super(page);
    this.state = this.page.locator('#state');
    this.postalCode = this.page.locator('#postal_code');
    this.city = this.page.locator('#city');
    this.proceedToCheckoutButton = this.page.getByTestId('proceed-3');
  }
  
  async fillInStateData(state: string){
    await this.state.fill(state);
  }
  async fillInPostalCodeData(postalCode: string){
    await this.state.fill(postalCode);
  }
}
