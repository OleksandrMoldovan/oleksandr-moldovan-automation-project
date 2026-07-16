import { expect } from '@playwright/test';
import { test } from '../../../fixture';

test('user can add a product to the cart', { tag: '@smoke' }, async ({ allPages }) => {
  await allPages.homePage.navigate();
  const expected = await allPages.homePage.getFirstProductSummary();

  await allPages.homePage.openFirstProduct();
  await allPages.productPage.addToCartBtn.click();

  await expect(allPages.productPage.productAddedMessage).toContainText(/added to shopping cart/i);
  await expect(allPages.productPage.header.cartBadge).toHaveText('1');

  await allPages.productPage.header.cart.click();

  await expect(allPages.cartPage.page).toHaveURL('/checkout');
  await expect(allPages.cartPage.cartQuantity).toHaveValue('1');
  await expect(allPages.cartPage.productTitle).toHaveText(expected.name);
  await expect(allPages.cartPage.proceedToCheckoutButton).toBeVisible();
});
