import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Add product e2e flow', async ({ loggedInPage }) => {
  // await loggedInPage.loginPage.submitBtnLocator.click(); 
  // await loggedInPage.loginPage.navigate();
  // await loggedInPage.homePage.navigate();

  // Add the first product from the home page to the cart (save product name and price).
  await loggedInPage.homePage.navigate();
  await loggedInPage.homePage.openFirstProduct();
  const productData = await loggedInPage.productPage.collectProductData();

  // Open the cart and verify that the product name, price, and total price match the added product.
  await loggedInPage.productPage.addToCartBtn.click();
  // await loggedInPage.cartPage.navigate('/checkout');
  await loggedInPage.basePage.header.cart.click();
  const productDataCart = await loggedInPage.cartPage.collectCartProductData();

  expect(productData).toEqual(productDataCart);
  expect(productData.price).toEqual(loggedInPage.cartPage.totalPrice);

  // Click Proceed to checkout
  await loggedInPage.cartPage.proceedToCheckoutButton.click();

  // Verify that the user is already logged in and no additional login is required
  await expect(loggedInPage.signInPage.loginButton).toBeHidden();
  await loggedInPage.signInPage.proceedToCheckoutButton.click();

  // Fill in the missing fields on the Billing Address page
  await loggedInPage.billingPage.fillInPostalCodeData('923-02');
  await loggedInPage.billingPage.fillInStateData('Samseburg');
  await loggedInPage.billingPage.proceedToCheckoutButton.click();

  // On the next page select:
  // Credit Card ->
  // Card number: 1111-1111-1111-1111 ->
  // Expiration Date: +3 months from the test execution date ->
  // CVV: 111 ->
  // Card Holder Name: any name ->
  // Confirm
  await loggedInPage.paymentPage.selectCreditCard();
  await loggedInPage.paymentPage.creditCardComponent.fillCreditCardForm(
    '1111-1111-1111-1111',
    '05/2026',
    '111',
    'Afanasij',
  );
  await loggedInPage.paymentPage.confirmCheckout();
 
  // Verify that the payment was successful
  await expect(loggedInPage.paymentPage.successMessage).toContainText(/successful/i);
});
