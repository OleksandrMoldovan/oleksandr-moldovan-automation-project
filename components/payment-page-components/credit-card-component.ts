import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../pages/base-page';
import { dummyCardData } from '../../tests/data/checkout-page-data/credit-card';

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
  async fillCreditCardForm(): Promise<void>{
    await this.creditCardNumber.fill(dummyCardData.number);
    await this.expirationDate.fill(dummyCardData.expirationDate);
    await this.cvv.fill(dummyCardData.cvv);
    await this.cardHolderName.fill(dummyCardData.name);
  }
}
