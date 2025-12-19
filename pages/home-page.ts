import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page'


export class HomePage extends BasePage {
  titleLocator:Locator 
  
  constructor(page: Page) {
    super(page)
    this.titleLocator= this.page.locator('h1[data-test = \'page-title\']')
  }


  async navigate() {
    await this.page.goto('https://practicesoftwaretesting.com/')
  }

  async openPageByAltText(productNameToNavigate:string='Combination Pliers') {
    
    await this.page.locator(`.card-img-top[alt = '${productNameToNavigate}']`).click()
  }
}
