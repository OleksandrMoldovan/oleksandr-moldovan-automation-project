import { expect } from '@playwright/test';
import { test } from '../../../fixture';

function parseCurrencyToCents(value: string): number {
  const normalized = value.trim().replace(/\p{Sc}/gu, '').trim();
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(normalized);

  if (!match) {
    throw new Error(`Invalid currency value: "${value}"`);
  }

  const cents = Number(match[1]) * 100 + Number((match[2] ?? '').padEnd(2, '0'));

  if (!Number.isSafeInteger(cents)) {
    throw new Error(`Currency value is outside the safe integer range: "${value}"`);
  }

  return cents;
}

function parseCartQuantity(value: string): number {
  const normalized = value.trim();
  const quantity = Number(normalized);

  if (!/^\d+$/.test(normalized) || !Number.isSafeInteger(quantity) || quantity < 1) {
    throw new Error(`Invalid cart quantity: "${value}"`);
  }

  return quantity;
}

test('user can add a product to the cart', { tag: '@smoke' }, async ({ allPages }) => {
  await allPages.homePage.navigate();
  const expected = await allPages.homePage.getFirstProductSummary();

  await allPages.homePage.openFirstProduct();
  await allPages.productPage.addToCartBtn.click();

  await expect(allPages.productPage.productAddedMessage).toContainText(/added to shopping cart/i);
  await expect(allPages.productPage.header.cartBadge).toHaveText('1');

  await allPages.productPage.header.cart.click();

  await expect(allPages.cartPage.page).toHaveURL('/checkout');
  await expect(allPages.cartPage.cartQuantity).toHaveValue(/^\d+$/);
  await expect(allPages.cartPage.productTitle).toHaveText(expected.name);

  const quantityText = await allPages.cartPage.cartQuantity.inputValue();
  const quantity = parseCartQuantity(quantityText);

  const expectedTotalInCents = parseCurrencyToCents(expected.price) * quantity;
  const actualTotalInCents = parseCurrencyToCents(await allPages.cartPage.totalPrice.innerText());

  expect(actualTotalInCents).toBe(expectedTotalInCents);
  await expect(allPages.cartPage.proceedToCheckoutButton).toBeVisible();
});
