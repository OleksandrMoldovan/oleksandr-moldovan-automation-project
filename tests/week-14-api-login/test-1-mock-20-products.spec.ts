import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Mock-data', async ({ allPages }) => {
  await allPages.homePage.mockProducts(20);
  await allPages.homePage.navigate();
  await expect(allPages.homePage.productCards).toHaveCount(20);
});
