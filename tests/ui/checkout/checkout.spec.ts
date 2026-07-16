import { expect } from '@playwright/test';
import { checkoutData } from '../../../test-data/checkout';
import { test } from '../../../fixture';

test('authenticated user can complete checkout', { tag: ['@regression', '@checkout'] }, async ({
  loggedInPage,
}) => {
  // Checkout creates persistent server data, so execution requires explicit opt-in.
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(
    process.env.ALLOW_CHECKOUT !== 'true',
    'Checkout mutates shared server data. Set ALLOW_CHECKOUT=true only in an approved test environment.',
  );

  await loggedInPage.homePage.navigate();
  await loggedInPage.homePage.openFirstProduct();
  const product = await loggedInPage.productPage.collectProductData();

  await loggedInPage.productPage.addToCartBtn.click();
  await loggedInPage.basePage.header.cart.click();

  expect(await loggedInPage.cartPage.collectCartProductData()).toEqual(product);

  await loggedInPage.cartPage.proceedToCheckoutButton.click();
  await expect(loggedInPage.signInPage.loginButton).toBeHidden();
  await loggedInPage.signInPage.proceedToCheckoutButton.click();
  await loggedInPage.billingPage.fillInPostalCodeData(checkoutData.postalCode);
  await loggedInPage.billingPage.fillInStateData(checkoutData.state);
  await loggedInPage.billingPage.proceedToCheckoutButton.click();
  await loggedInPage.paymentPage.selectCreditCard();
  await loggedInPage.paymentPage.creditCardComponent.fillCreditCardForm(checkoutData.card);
  await loggedInPage.paymentPage.confirmCheckout();

  await expect(loggedInPage.paymentPage.successMessage).toContainText(/successful/i);
});
