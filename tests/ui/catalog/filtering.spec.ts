import { expect } from '@playwright/test';
import { PowerTools } from '../../../test-data/catalog';
import { test } from '../../../fixture';

test('catalog can be filtered by product type', { tag: '@regression' }, async ({ allPages }) => {
  await allPages.homePage.navigate();
  await allPages.homePage.filterPanel.checkFilter(PowerTools.Sander);

  await expect.poll(async () => {
    const titles = await allPages.homePage.getProductTitles();

    return titles.length > 0 && titles.every(title => title.includes(PowerTools.Sander));
  }).toBe(true);
});
