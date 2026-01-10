import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Verify user can view product details', async ({ allPages }) => {

  const productNameCombination = 'Combination Pliers';
  const productPrice = '14.15'; 

  await allPages.homePage.navigate();
  await allPages.homePage.clickProduct(productNameCombination);

  await expect(allPages.productPage.page).toHaveURL(/product/);  
  await expect(allPages.productPage.productName).toHaveText(productNameCombination);

  await expect(allPages.productPage.unitPrice).toHaveText(productPrice);
  await expect(allPages.productPage.addToCart).toBeVisible();
  await expect(allPages.productPage.addToFavorites).toBeVisible();
});
