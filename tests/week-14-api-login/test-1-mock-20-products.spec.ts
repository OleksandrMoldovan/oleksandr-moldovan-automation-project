import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { productToVerify } from '../data/home-page';

test('Mock-data', async ({ allPages }) => {

  await allPages.homePage.mockProducts(productToVerify);
  await allPages.homePage.navigate();
  await expect(allPages.homePage.productCards).toHaveCount(productToVerify);
  for (let i = 0; i < productToVerify; i++) {
    await expect(allPages.homePage.productCards.nth(i)).toBeVisible();
  }
});
