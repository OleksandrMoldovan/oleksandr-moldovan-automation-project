import { expect } from '@playwright/test';
import { SortTitles } from '../data/sorting-options';
import { test } from '../../fixture';

const sortTitlesOptions = Object.values(SortTitles);

;

function expectedSortedTitles(values: string[], option: SortTitles): string[] {
  const copy = [...values].sort((a, b) => a.localeCompare(b));

  return option === SortTitles.NameDesc ? copy.reverse() : copy;
}

for (const option of sortTitlesOptions) {
  test(`should sort products by ${option}`, async ({ allPages }) => {

    await allPages.homePage.navigate();

    const before = await allPages.homePage.getProductTitles();

    await allPages.homePage.sortPanel.sortByTitle(option);

    const after = await allPages.homePage.getProductTitles();

    const expected = expectedSortedTitles(before, option);

    expect(after).toEqual(expected);
  });
}
