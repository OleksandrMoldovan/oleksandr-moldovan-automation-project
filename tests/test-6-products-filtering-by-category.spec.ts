import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PowerTools } from '../components/filter-panel';

test('Check filtering with "Sander"', async ({ page }) => {
  const currentHomePage = new HomePage(page);

  await currentHomePage.navigate(); 

  await currentHomePage.filterPanel.checkFilter(PowerTools.Sander);

  await expect.poll(async () => {
    const titles = await currentHomePage.getProductTitles();

    if (titles.length === 0) return false;

    return titles.every(t => t.includes(PowerTools.Sander));
  }, { timeout: 10_000 }).toBe(true);

  const titles = await currentHomePage.getProductTitles();

  expect(titles.length).toBeGreaterThan(0);
  expect(titles.every(t => t.includes(PowerTools.Sander))).toBe(true);
});
