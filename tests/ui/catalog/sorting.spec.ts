import { expect } from '@playwright/test';
import { SortPrices, SortTitles } from '../../../test-data/catalog';
import { test } from '../../../fixture';

const titleCases = [
  { option: SortTitles.NameAsc, compare: (a: string, b: string) => a.localeCompare(b) },
  { option: SortTitles.NameDesc, compare: (a: string, b: string) => b.localeCompare(a) },
];

const priceCases = [
  { option: SortPrices.PriceAsc, compare: (a: number, b: number) => a - b },
  { option: SortPrices.PriceDesc, compare: (a: number, b: number) => b - a },
];

for (const { option, compare } of titleCases) {
  test(`products can be sorted by ${option}`, { tag: '@regression' }, async ({ allPages }) => {
    await allPages.homePage.navigate();
    await allPages.homePage.sortPanel.sortByTitle(option);
    const actual = await allPages.homePage.getProductTitles();
    const expected = [...actual].sort(compare);

    expect(actual).toEqual(expected);
  });
}

for (const { option, compare } of priceCases) {
  test(`products can be sorted by ${option}`, { tag: '@regression' }, async ({ allPages }) => {
    await allPages.homePage.navigate();
    await allPages.homePage.sortPanel.sortByPrice(option);
    const actual = await allPages.homePage.getProductPrices();
    const expected = [...actual].sort(compare);

    expect(actual).toEqual(expected);
  });
}
