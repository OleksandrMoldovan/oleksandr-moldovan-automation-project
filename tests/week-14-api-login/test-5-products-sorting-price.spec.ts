import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { SortPrices } from '../data/sorting-options';
const sortByPriceOptions = Object.values(SortPrices);

function expectedSortedPrices(values: number[], option: SortPrices): number[] {
  const copy = [...values].sort((a, b) => a - b);

  return option === SortPrices.PriceDesc ? copy.reverse() : copy;
}

for (const option of sortByPriceOptions) {
  test(`should sort products by ${option}`, async ({ allPages }) => {

    await allPages.homePage.navigate();

    await allPages.homePage.sortPanel.sortByPrice(option);

    const after = await allPages.homePage.getProductPrices();

    const expected = expectedSortedPrices(after, option);

    expect(after).toEqual(expected);
  });
}
