import { expect } from '@playwright/test';
import { PowerTools } from '../../components/filter-panel';
import { test } from '../../fixture';

test('Check filtering with "Sander"', async ({ allPages }) => {

  await allPages.homePage.navigate(); 

  await allPages.homePage.filterPanel.checkFilter(PowerTools.Sander);

  await expect.poll(async () => {
    const titles = await allPages.homePage.getProductTitles();

    if (titles.length === 0) return false;

    return titles.every(t => t.includes(PowerTools.Sander));
  }, { timeout: 10_000 }).toBe(true);

  const titles = await allPages.homePage.getProductTitles();

  expect(titles.length).toBeGreaterThan(0);
  expect(titles.every(t => t.includes(PowerTools.Sander))).toBe(true);
});
