import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Mock-data', async ({ allPages }) => {
  const productToVerify = 20;

  await allPages.homePage.mockProducts(productToVerify);
  await allPages.homePage.navigate();
  await expect(allPages.homePage.productCards).toHaveCount(productToVerify);
  for (let i = 0; i < productToVerify; i++) {
    await expect(allPages.homePage.productCards.nth(i)).toBeVisible();
  }
});
