import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../pages/base-page';

export class CreditCard extends BasePage{
  creditCardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  cardHolderName: Locator;

  constructor(page: Page){
    super(page);
    this.creditCardNumber = this.page.locator('#credit_card_number');
    this.expirationDate = this.page.locator('#expiration_date');
    this.cvv = this.page.locator('#cvv');
    this.cardHolderName = this.page.locator('#card_holder_name');

  }
  async fillCreditCardForm(CardNumber: string, expDate: string, cvv: string, HolderName: string): Promise<void>{
    await this.creditCardNumber.fill(CardNumber);
    await this.expirationDate.fill(expDate);
    await this.cvv.fill(cvv);
    await this.cardHolderName.fill(HolderName);

  }
}
