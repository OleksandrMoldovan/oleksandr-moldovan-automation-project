import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { SortPrices } from '../data/sorting-options';

const sortByPriceOptions = Object.values(SortPrices) as SortPrices[];

function expectedSortedPrices(values: number[], option: SortPrices): number[] {
  const copy = [...values].sort((a, b) => a - b);

  return option === SortPrices.PriceDesc ? copy.reverse() : copy;
}

for (const option of sortByPriceOptions) {
  test(`should sort products by ${option}`, { tag: '@regression' }, async ({ loggedInPage }) => {
    await test.step('Navigate to home page', async () => {
      await loggedInPage.homePage.navigate();
    });

    await test.step(`Sort by price: ${option}`, async () => {
      await loggedInPage.homePage.sortPanel.sortByPrice(option);
    });

    const after = await test.step('Get product prices', async () => {
      return await loggedInPage.homePage.getProductPrices();
    });

    await test.step('Verify prices are sorted', async () => {
      const expected = expectedSortedPrices(after, option);

      expect(after).toEqual(expected);
    });
  });
}
