import { expect } from '@playwright/test';
import { test } from '../../fixture';
import { PowerTools } from '../../components/filter-panel';

test('Check filtering with "Sander"', { tag: '@regression' }, async ({ loggedInPage }) => {
  await test.step('Navigate to home page', async () => {
    await loggedInPage.homePage.navigate();
  });

  await test.step('Apply filter "Sander"', async () => {
    await loggedInPage.homePage.filterPanel.checkFilter(PowerTools.Sander);
  });

  await test.step('Wait until products match the filter', async () => {
    await expect.poll(async () => {
      const titles = await loggedInPage.homePage.getProductTitles();

      if (titles.length === 0) return false;

      return titles.every(t => t.includes(PowerTools.Sander));
    }, { timeout: 10_000 }).toBe(true);
  });

  await test.step('Verify filtered results', async () => {
    const titles = await loggedInPage.homePage.getProductTitles();

    expect(titles.length).toBeGreaterThan(0);
    expect(titles.every(t => t.includes(PowerTools.Sander))).toBe(true);
  });
});
