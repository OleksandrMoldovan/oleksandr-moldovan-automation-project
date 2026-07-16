import { expect } from '@playwright/test';
import { test } from '../../../fixture';

test('user can view product details', { tag: '@smoke' }, async ({ allPages }) => {
  await allPages.homePage.navigate();
  const expected = await allPages.homePage.getFirstProductSummary();

  await allPages.homePage.openFirstProduct();

  await expect(allPages.productPage.page).toHaveURL(/\/product\/.+/);
  await expect(allPages.productPage.productName).toHaveText(expected.name);
  await expect(allPages.productPage.unitPrice).toHaveText(expected.price);
  await expect(allPages.productPage.addToCartBtn).toBeVisible();
  await expect(allPages.productPage.addToFavorites).toBeVisible();
});
