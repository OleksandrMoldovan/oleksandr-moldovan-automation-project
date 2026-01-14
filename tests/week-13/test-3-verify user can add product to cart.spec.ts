import { expect } from '@playwright/test';
import { test } from '../../fixture';
test.describe('test-3-verify user can add product to cart.spec', ()=>{
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Verify user can add product Slip Joint Pliers to cart', async ({ allPages }) => {
    const productNameCombination = 'Slip Joint Pliers';
    const productPrice = '9.17'; 
    const messageText = ' Product added to shopping cart. ';

    await allPages.homePage.navigate();
    await allPages.homePage.clickProduct(productNameCombination);

    //Assert: 1  Verify URL contains https://practicesoftwaretesting.com/product.
    await expect(allPages.productPage.page).toHaveURL(/\/product\/.+/);  
    await expect(allPages.productPage.productName).toHaveText(productNameCombination);
    await expect(allPages.productPage.unitPrice).toHaveText(productPrice);  
    
    //Assert: 2 Verify alert message is visible.
    await allPages.productPage.addToCartBtn.click();
    await expect(allPages.productPage.productAddedMessage).toHaveText(messageText);
    await expect(allPages.productPage.productAddedMessage).toBeHidden({ timeout:8_000 });
    await expect(allPages.productPage.header.cartBadge).toHaveText('1');
    
    ///Assert: 3 Click on the cart icon in the navigation.
    await allPages.productPage.header.cart.click();
    await expect(allPages.productPage.page).toHaveURL('/checkout');
    await expect(allPages.cartPage.cartQuantity).toHaveValue('1');
    await expect(allPages.cartPage.productTitle).toHaveText(productNameCombination);
    await expect(allPages.cartPage.proceedToCheckoutButton).toBeVisible();
  });
});
