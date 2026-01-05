import { expect, test } from '@playwright/test';
//import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { HomePage } from '../pages/home-page';

test('Verify user can view product details', async ({ page }) => {

  const productNameCombination = 'Combination Pliers';
  const productPrice = '14.15';
  // const loginPage = new LoginPage(page);

  // await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
 
  const homePage = new HomePage(page);

  await homePage.navigate();
  await homePage.clickProduct(productNameCombination);
  const currentProductPage = new ProductPage(page);

  await expect(currentProductPage.page).toHaveURL(/product/);  
  await expect(currentProductPage.productName).toHaveText(productNameCombination);

  await expect(currentProductPage.unitPrice).toHaveText(productPrice);
  await expect(currentProductPage.addToCart).toBeVisible();
  await expect(currentProductPage.addToFavorites).toBeVisible();
});
