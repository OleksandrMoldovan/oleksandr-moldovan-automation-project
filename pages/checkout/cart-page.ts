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
    this.cartQuantity = this.page.locator('[data-test="product-quantity"]');
    this.productTitle = this.page.locator('[data-test="product-title"]');
    this.proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');
    this.totalPrice = this.page.getByTestId('cart-total');
    this.productPrice = this.page.getByTestId('product-price');
    // this.cartToCheckout = this.page.getByTestId('nav-cart'); ----- delete?
  }
  async collectCartProductData(){
    const productData = {
      name: await this.productTitle.innerText(),
      price:await this.productPrice.innerText(),
    };

    return productData;
  }
}
