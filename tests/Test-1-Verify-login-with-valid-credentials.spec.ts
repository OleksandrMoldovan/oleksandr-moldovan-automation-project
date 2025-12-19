import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { AccountPage } from '../pages/my-account-page'




test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01')
  
  
  //accountPage

  const accountPage = new AccountPage(page)

  await expect(accountPage.page).toHaveURL('/account')

  await expect(accountPage.titleLocator).toHaveText('My account')

  await expect(page.locator('a#menu')).toHaveText('Jane Doe')
})


