import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { sortTitles } from './data/sorting-options';

function expectedSortedTitles(values: string[], option: string): string[] {
  const copy = [...values];

  copy.sort((a, b) => a.localeCompare(b));

  return option.endsWith(',desc') ? copy.reverse() : copy;
}

sortTitles.forEach((option) => {
  test(`should sort products by ${option}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();

    const before = await homePage.getProductTitles();

    await homePage.sortPanel.selectSortOption(option);

    const after = await homePage.getProductTitles();

    const expected = expectedSortedTitles(before, option);

    expect(after).toEqual(expected);
  });
});
