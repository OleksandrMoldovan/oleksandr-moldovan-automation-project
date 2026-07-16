import { CreditCard } from '../../components/payment-page-components/credit-card-component';
import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class PaymentPage extends BasePage{
  paymentMethods: Locator;
  confirmButton: Locator;
  successMessage: Locator;
  creditCardComponent: CreditCard;
  constructor(page: Page){
    super(page);
    this.paymentMethods = this.page.locator('#payment-method');
    this.confirmButton = this.page.getByTestId('finish');
    this.successMessage = this.page.getByTestId('payment-success-message');
    this.creditCardComponent = new CreditCard(page);
  }

  async selectCreditCard(): Promise<void> {
    await this.paymentMethods.selectOption('credit-card');
  }
  async confirmCheckout(): Promise<void> {
    await this.confirmButton.click();
  }
}
