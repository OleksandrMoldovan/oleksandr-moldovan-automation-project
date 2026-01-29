import { expect } from '@playwright/test';
import { test } from '../../fixture';

test(
  'Verify user can add product Slip Joint Pliers to cart',
  { tag: '@smoke' },
  async ({ loggedInPage }) => {
    const productName = 'Slip Joint Pliers';
    const productPrice = '9.17';
    const messageText = ' Product added to shopping cart. ';

    await test.step('Navigate to home page', async () => {
      await loggedInPage.homePage.navigate();
    });

    await test.step('Open product page', async () => {
      await loggedInPage.homePage.clickProduct(productName);
    });

    await test.step('Verify product details', async () => {
      await expect(loggedInPage.productPage.page).toHaveURL(/\/product\/.+/);
      await expect(loggedInPage.productPage.productName).toHaveText(productName);
      await expect(loggedInPage.productPage.unitPrice).toHaveText(productPrice);
    });

    await test.step('Add product to cart', async () => {
      await loggedInPage.productPage.addToCartBtn.click();
      await expect(loggedInPage.productPage.productAddedMessage).toHaveText(messageText);
      await expect(loggedInPage.productPage.productAddedMessage).toBeHidden({ timeout: 8_000 });
      await expect(loggedInPage.productPage.header.cartBadge).toHaveText('1');
    });

    await test.step('Open cart and verify product', async () => {
      await loggedInPage.productPage.header.cart.click();

      await expect(loggedInPage.cartPage.page).toHaveURL('/checkout');
      await expect(loggedInPage.cartPage.cartQuantity).toHaveValue('1');
      await expect(loggedInPage.cartPage.productTitle).toHaveText(productName);
      await expect(loggedInPage.cartPage.proceedToCheckoutButton).toBeVisible();
    });
  },
);
