# Web Page Automation

This project focuses on automating web pages using **Playwright** with **JavaScript/TypeScript**.  
The code interacts with the browser, manipulates page elements, and automates user actions such as clicking, typing, navigation, and validating page content.

---

## 🔧 Tech Stack

- **Language:** JavaScript / TypeScript  
- **Automation Framework:** Playwright Test Runner  
- **Supported Browsers:** Chromium, Firefox, WebKit (managed by Playwright)

---

## ✨ Features

- Automated navigation across web pages  
- Interaction with elements (clicks, typing, checkboxes, form submission)  
- Built-in Playwright **assertions** for page validation  
- Scenario recording using `playwright codegen`  
- Continuous extension of test cases for learning purposes

> This is an educational project and will grow with new test scenarios over time.

---

## 🚀 Installation & Setup

### 1. Clone the repository

git clone <repository-url>
cd <project-name>

### 2. Install dependencies

npm install

If Playwright is not installed yet:

npm init -y
npm install -D @playwright/test
npx playwright install

---

## 📜 npm Scripts

{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "codegen": "playwright codegen"
  }
}

Usage:

npm test
npm run test:headed
npm run test:ui
npm run codegen

---

## 🧪 Testing

Example test:

import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

Run tests:

npx playwright test

---

## 🧱 Project Structure

.
├── tests/                
│   └── example.spec.ts
├── playwright.config.ts  
├── package.json
├── package-lock.json
└── README.md

---

## 📈 Roadmap

- Add more real-world user interaction tests  
- Form validation tests  
- Login/logout test scenarios  
- Dynamic page element handling  
- (Optional) Introduce Page Object Model (POM)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

Oleksandr Moldovan
