import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SortTitles } from './data/sorting-options';

const sortTitlesOptions = Object.values(SortTitles);

;

function expectedSortedTitles(values: string[], option: SortTitles): string[] {
  const copy = [...values].sort((a, b) => a.localeCompare(b));

  return option === SortTitles.NameDesc ? copy.reverse() : copy;
}

for (const option of sortTitlesOptions) {
  test(`should sort products by ${option}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    const before = await homePage.getProductTitles();

    await homePage.sortPanel.sortByTitle(option);

    const after = await homePage.getProductTitles();

    const expected = expectedSortedTitles(before, option);

    expect(after).toEqual(expected);
  });
}
