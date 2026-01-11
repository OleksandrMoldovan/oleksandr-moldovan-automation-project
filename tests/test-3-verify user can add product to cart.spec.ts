import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/product-page';
import { HomePage } from '../pages/home-page';
import { CartPage } from '../pages/checkout/cart-page';

test.describe('test-3-verify user can add product to cart.spec', ()=>{
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Verify user can add product Slip Joint Pliers to cart', async ({ page }) => {
    const productNameCombination = 'Slip Joint Pliers';
    const productPrice = '9.17'; 
    const messageText = ' Product added to shopping cart. ';
    
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.clickProduct(productNameCombination);

    const currentProductPage = new ProductPage(page);

    //Assert: 1  Verify URL contains https://practicesoftwaretesting.com/product.
    await expect(currentProductPage.page).toHaveURL(/\/product\/.+/);  
    await expect(currentProductPage.productName).toHaveText(productNameCombination);
    await expect(currentProductPage.unitPrice).toHaveText(productPrice);  
    
    //Assert: 2 Verify alert message is visible.
    await currentProductPage.addToCartBtn.click();
    await expect( currentProductPage.productAddedMessage).toHaveText(messageText);
    await expect (currentProductPage.productAddedMessage).toBeHidden({ timeout:8_000 });
    await expect(currentProductPage.header.cartBadge).toHaveText('1');
    
    ///Assert: 3 Click on the cart icon in the navigation.
    const currentCheckout = new CartPage(page);

    await currentProductPage.header.cart.click();
    await expect( currentProductPage.page).toHaveURL('/checkout');
    await expect (currentCheckout.cartQuantity).toHaveValue('1');
    await expect(currentCheckout.productTitle).toHaveText(productNameCombination);
    await expect(currentCheckout.proceedToCheckoutButton).toBeVisible();
  });
});
