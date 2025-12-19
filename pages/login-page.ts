import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page'

export class LoginPage extends BasePage{
  emailLocator:Locator 
  passwordLocator:Locator 
  // email:string = 'customer@practicesoftwaretesting.com'
  // password:string = 'welcome01'
  submitBtnLocator:Locator

  constructor(page: Page) {
    super(page)
    this.emailLocator = this.page.locator('#email')
    this.passwordLocator = this.page.locator('#password')
    this.submitBtnLocator = this.page.locator('.btnSubmit')
    
  }

  async performLogin(email: string, password: string):Promise<void>{
    await this.page.goto('/auth/login')
    await this.emailLocator.fill(email)
    await this.passwordLocator.fill(password)
    await this.submitBtnLocator.click()
  }
}

