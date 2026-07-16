import { baseUrl } from './config/environment';
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'artifacts/playwright-report' }],
    ['json', { outputFile: 'artifacts/test-results.json' }],
    ['dot'],
  ],
  use: {
    baseURL: baseUrl,
    trace: 'on-first-retry',
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /setup\/.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testMatch: /ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
      // All UI tests currently run setup; public/authenticated projects can be split later.
      dependencies: ['setup'],
    },
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
    },
  ],
});
