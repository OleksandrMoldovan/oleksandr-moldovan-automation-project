import { Locator, Page } from '@playwright/test';
import type { CreditCardData } from '../test-data/checkout';

export class CreditCardForm {
  private readonly creditCardNumber: Locator;
  private readonly expirationDate: Locator;
  private readonly cvv: Locator;
  private readonly cardHolderName: Locator;

  constructor(page: Page) {
    this.creditCardNumber = page.locator('#credit_card_number');
    this.expirationDate = page.locator('#expiration_date');
    this.cvv = page.locator('#cvv');
    this.cardHolderName = page.locator('#card_holder_name');
  }

  async fill(card: CreditCardData): Promise<void> {
    await this.creditCardNumber.fill(card.number);
    await this.expirationDate.fill(card.expirationDate);
    await this.cvv.fill(card.cvv);
    await this.cardHolderName.fill(card.holderName);
  }
}
