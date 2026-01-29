import { expect } from '@playwright/test';
import { test } from '../../fixture';

test(
  'Verify user can view product details',
  { tag: '@smoke' },
  async ({ loggedInPage }) => {
    const productNameCombination = 'Combination Pliers';
    const productPrice = '14.15';

    await test.step('Navigate to home page', async () => {
      await loggedInPage.homePage.navigate();
    });

    await test.step('Open product details', async () => {
      await loggedInPage.homePage.clickProduct(productNameCombination);
    });

    await test.step('Verify product page URL', async () => {
      await expect(loggedInPage.productPage.page).toHaveURL(/product/);
    });

    await test.step('Verify product name and price', async () => {
      await expect(loggedInPage.productPage.productName).toHaveText(productNameCombination);
      await expect(loggedInPage.productPage.unitPrice).toHaveText(productPrice);
    });

    await test.step('Verify product actions are visible', async () => {
      await expect(loggedInPage.productPage.addToCartBtn).toBeVisible();
      await expect(loggedInPage.productPage.addToFavorites).toBeVisible();
    });
  },
);
