import { BasePage } from '../base-page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage{
  cartQuantity: Locator;
  productTitle: Locator;
  proceedToCheckoutButton: Locator;
  totalPrice: Locator;
  productPrice: Locator;
  // cartToCheckout: Locator;
  constructor(page: Page){
    super(page);
    this.cartQuantity = this.page.getByTestId('product-quantity');
    this.productTitle = this.page.getByTestId('product-title');
    this.proceedToCheckoutButton = this.page.getByTestId('proceed-1');
    this.totalPrice = this.page.getByTestId('cart-total');
    this.productPrice = this.page.getByTestId('product-price');

  }
  async collectCartProductData(){
    const productData = {
      name: (await this.productTitle.innerText()).trim(),
      price:(await this.productPrice.innerText()).replace(/[^\d.]/g, ''),
    };

    return productData;
  }
}
