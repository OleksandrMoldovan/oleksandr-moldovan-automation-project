import { baseUrl } from './config/environment';
import { authStatePath } from './config/paths';
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  outputDir: 'artifacts/test-results',
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
      name: 'api',
      testMatch: 'api/**/*.spec.ts',
    },
    {
      name: 'setup',
      testMatch: 'setup/**/*.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'public-chromium',
      testMatch: [
        'ui/auth/**/*.spec.ts',
        'ui/cart/**/*.spec.ts',
        'ui/catalog/**/*.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'authenticated-chromium',
      testMatch: [
        'ui/account/**/*.spec.ts',
        'ui/checkout/**/*.spec.ts',
      ],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authStatePath,
      },
      dependencies: ['setup'],
    },
  ],
});
