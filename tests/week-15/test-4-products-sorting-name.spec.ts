import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { SortTitles } from '../data/sorting-options';

const sortTitlesOptions = Object.values(SortTitles);

function expectedSortedTitles(values: string[], option: SortTitles): string[] {
  const copy = [...values].sort((a, b) => a.localeCompare(b));

  return option === SortTitles.NameDesc ? copy.reverse() : copy;
}

for (const option of sortTitlesOptions) {
  test(`should sort products by ${option}`, { tag: '@regression' }, async ({ loggedInPage }) => {
    await test.step('Navigate to home page', async () => {
      await loggedInPage.homePage.navigate();
    });

    const before = await test.step('Get product titles before sorting', async () => {
      return await loggedInPage.homePage.getProductTitles();
    });

    await test.step(`Sort products by ${option}`, async () => {
      await loggedInPage.homePage.sortPanel.sortByTitle(option);
    });

    const after = await test.step('Get product titles after sorting', async () => {
      return await loggedInPage.homePage.getProductTitles();
    });

    await test.step('Verify products are sorted correctly', async () => {
      const expected = expectedSortedTitles(before, option);

      expect(after).toEqual(expected);
    });
  });
}
