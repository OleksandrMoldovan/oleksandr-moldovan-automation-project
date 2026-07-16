import { CreditCardForm } from '../../components/credit-card-form';
import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class PaymentPage extends BasePage{
  paymentMethods: Locator;
  confirmButton: Locator;
  successMessage: Locator;
  creditCardForm: CreditCardForm;
  constructor(page: Page){
    super(page);
    this.paymentMethods = this.page.locator('#payment-method');
    this.confirmButton = this.page.getByTestId('finish');
    this.successMessage = this.page.getByTestId('payment-success-message');
    this.creditCardForm = new CreditCardForm(page);
  }

  async selectCreditCard(): Promise<void> {
    await this.paymentMethods.selectOption('credit-card');
  }
  async confirmCheckout(): Promise<void> {
    await this.confirmButton.click();
  }
}
