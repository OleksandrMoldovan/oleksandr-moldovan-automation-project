import { expect } from '@playwright/test';
import { test } from '../../fixture';

test('Check filtering with "Sander"', async ({ allPages, loggedInPage }) => {
  await allPages.homePage.navigate(); 
  await allPages.homePage.clickProduct()
  await allPages.homePage.


});
// Додати перший товар зі домашньої сторінки в корзину (зберегти назву та ціну товару).
// Відкрити корзину та перевірити, що назва, ціна і сумарна ціна відповідають доданому товару.
// Натиснути Proceed to checkout
// Перевірити, що юзер вже залогінений і нічого додатково робити не потрібно
// Ввести відсутні поля на сторінці Billing Address
// На наступній сторінці вибрати:
// Credit Card -> Card number: 1111-1111-1111-1111 -> 
// Expiration Date: +3 місяці до дати запуску тесту -> 
// CVV: 111 -> Card Holder Name: any name -> Confirm
// Перевірити, що платіж був успішним.
