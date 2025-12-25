import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/product-page';
import { HomePage } from '../pages/home-page';

test.describe('test-3-verify user can add product to cart.spec', ()=>{
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Verify user can add product Slip Joint Pliers to cart', async ({ page }) => {
    const productNameCombination = 'Slip Joint Pliers';
    const productPrice = '9.17'; 
    
    const homePage = new HomePage(page);

    await homePage.navigate();
    //await homePage.clickProduct(productNameCombination);---- how is better such or approach below
    page.locator('[data-test="product-name"]').filter({ hasText:`${productNameCombination}` }); //-- this one 
    const currentProductPage = new ProductPage(page);

    //Assert: 1
    await expect(currentProductPage.page).toHaveURL(/product/);  
    await expect(currentProductPage.productName).toHaveText(productNameCombination);
    await expect(currentProductPage.unitPrice).toHaveText(productPrice);
    
    //Assert: 2
    await currentProductPage.addToCart.click();
    await expect( currentProductPage.productAddedContainer).toHaveText('Product added to shopping cart');
    await expect (currentProductPage.productAddedContainer).toBeHidden({ timeout:8_000 });
    await expect; 
    // 4. Verify cart icon in navigation shows quantity = 1.
    await expect(currentProductPage.addToFavorites).toBeVisible();
  });
});
