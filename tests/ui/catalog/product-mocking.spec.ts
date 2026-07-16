import { expect } from '@playwright/test';
import { mockedProductCount } from '../../../test-data/catalog';
import { test } from '../../../fixture';

test('catalog renders a deterministic mocked response', { tag: '@regression' }, async ({ allPages }) => {
  await allPages.homePage.mockProducts(mockedProductCount);
  await allPages.homePage.navigate();

  await expect(allPages.homePage.productCards).toHaveCount(mockedProductCount);
  await expect(allPages.homePage.productTitles.first()).toHaveText('Mock Product 01');
});
