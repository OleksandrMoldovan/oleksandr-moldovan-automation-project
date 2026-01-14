import { CreditCard } from '../../components/payment-page-components/credit-card-component';
import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class PaymentPage extends BasePage{
  paymentMethods: Locator;
  productTitle: Locator;
  confirmButton: Locator;
  successMessage: Locator;
  creditCardComponent: CreditCard;
  constructor(page: Page){
    super(page);
    this.paymentMethods = this.page.locator('#payment-method');
    this.productTitle = this.page.locator('[data-test="product-title"]');
    this.confirmButton = this.page.getByTestId('finish');
    this.successMessage = this.page.getByTestId('payment-success-message');
    this.creditCardComponent = new CreditCard(page);
  }

  async selectPaymentMethod(paymentMethod: string){
    await this.paymentMethods.selectOption(paymentMethod);
  }
  async selectCreditCard(){
    await this.paymentMethods.selectOption('credit-card');
  }
  async confirmCheckout(){
    await this.confirmButton.click();
  }
}
