import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../pages/base-page';
import type { CreditCardData } from '../../test-data/checkout';

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
  async fillCreditCardForm(card: CreditCardData): Promise<void> {
    await this.creditCardNumber.fill(card.number);
    await this.expirationDate.fill(card.expirationDate);
    await this.cvv.fill(card.cvv);
    await this.cardHolderName.fill(card.holderName);
  }
}
