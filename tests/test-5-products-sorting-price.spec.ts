import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SortPrices } from './data/sorting-options';
const sortByPriceOptions = Object.values(SortPrices) as SortPrices[];

function expectedSortedPrices(values: number[], option: SortPrices): number[] {
  const copy = [...values].sort((a, b) => a - b);

  return option === SortPrices.PriceDesc ? copy.reverse() : copy;
}

for (const option of sortByPriceOptions) {
  test(`should sort products by ${option}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    await homePage.sortPanel.sortByPrice(option);

    const after = await homePage.getProductPrices();

    const expected = expectedSortedPrices(after, option);

    expect(after).toEqual(expected);
  });
}
