import {
  expect,
  Page,
  Locator,
  Response,
  ConsoleMessage,
  Request,
  Route,
} from '@playwright/test';
import {
  createSafeDiagnosticPreview,
  formatResponseDiagnostics,
} from '../api/auth-client';
import { apiUrl } from '../config/environment';
import { BasePage } from './base-page';

export interface LoginAttempt {
  response: Response;
  responseDiagnostics: string;
  transitionDiagnostics: LoginTransitionDiagnostics;
}

export class LoginTransitionDiagnostics {
  private readonly failedResponseDiagnostics: Promise<string>[] = [];
  private readonly failedRequests: string[] = [];
  private readonly consoleErrors: string[] = [];
  private readonly pageErrors: string[] = [];
  private stopped = false;

  constructor(
    private readonly page: Page,
    private readonly apiHost: string,
  ) {
    page.on('response', this.captureFailedResponse);
    page.on('requestfailed', this.captureFailedRequest);
    page.on('console', this.captureConsoleError);
    page.on('pageerror', this.capturePageError);
  }

  async complete(): Promise<string> {
    this.stop();
    const failedResponses = await Promise.all(this.failedResponseDiagnostics);

    return [
      formatDiagnosticGroup('Relevant failed API responses', failedResponses),
      formatDiagnosticGroup('Relevant network-failed API requests', this.failedRequests),
      formatDiagnosticGroup('Browser console errors', this.consoleErrors),
      formatDiagnosticGroup('Uncaught page errors', this.pageErrors),
    ].join('\n');
  }

  private readonly captureFailedResponse = (response: Response): void => {
    const url = new URL(response.url());
    const relevantPath = /\/(?:users|account|profile|session)(?:\/|$)/i.test(url.pathname);

    if (url.host === this.apiHost && relevantPath && response.status() >= 400) {
      const method = response.request().method();

      this.failedResponseDiagnostics.push(
        formatResponseDiagnostics(response).then(details => `method=${method}; ${details}`),
      );
    }
  };

  private readonly captureFailedRequest = (request: Request): void => {
    const url = new URL(request.url());
    const relevantPath = /\/(?:users|account|profile|session)(?:\/|$)/i.test(url.pathname);

    if (url.host === this.apiHost && relevantPath) {
      const failure = request.failure()?.errorText ?? '<unknown network error>';

      this.failedRequests.push([
        `method=${request.method()}`,
        `url=${JSON.stringify(createSafeDiagnosticPreview(request.url()))}`,
        `failure=${JSON.stringify(createSafeDiagnosticPreview(failure))}`,
      ].join('; '));
    }
  };

  private readonly captureConsoleError = (message: ConsoleMessage): void => {
    if (message.type() === 'error') {
      this.consoleErrors.push(createSafeDiagnosticPreview(message.text()));
    }
  };

  private readonly capturePageError = (error: Error): void => {
    this.pageErrors.push(createSafeDiagnosticPreview(error.message));
  };

  private stop(): void {
    if (this.stopped) return;

    this.stopped = true;
    this.page.off('response', this.captureFailedResponse);
    this.page.off('requestfailed', this.captureFailedRequest);
    this.page.off('console', this.captureConsoleError);
    this.page.off('pageerror', this.capturePageError);
  }
}

function formatDiagnosticGroup(label: string, entries: string[]): string {
  return entries.length > 0 ? `${label}: ${entries.join(' | ')}` : `${label}: none observed`;
}

export class LoginPage extends BasePage{
  emailLocator: Locator; 
  passwordLocator: Locator; 
  submitBtnLocator: Locator;
  loginPageUrl: string;

  constructor(page: Page) {
    super(page);
    this.emailLocator = this.page.locator('#email');
    this.passwordLocator = this.page.locator('#password');
    this.submitBtnLocator = this.page.locator('.btnSubmit');
    this.loginPageUrl = '/auth/login';
    
  }

  async navigateToLoginPage(): Promise<void> {
    const mainDocumentResponse = await this.page.goto(this.loginPageUrl);

    try {
      await expect(this.page).toHaveURL(/\/auth\/login(?:[/?#]|$)/);
      await expect(this.emailLocator).toBeVisible();
    } catch (error: unknown) {
      const diagnostics = await this.createReadinessDiagnostics(mainDocumentResponse);
      const message = error instanceof Error ? error.message : String(error);

      throw new Error(`${message}\nLogin page did not become ready. ${diagnostics}`);
    }
  }

  async performLogin(email: string, password: string): Promise<LoginAttempt> {
    const loginEndpoint = `${apiUrl.replace(/\/$/, '')}/users/login`;
    const apiHost = new URL(loginEndpoint).host;
    const isLoginEndpoint = (url: URL): boolean => url.host === apiHost
      && url.pathname.endsWith('/users/login');
    const transitionDiagnostics = new LoginTransitionDiagnostics(this.page, apiHost);
    let loginResponseDiagnostics = '<login response body was not captured>';
    const captureLoginResponse = async (route: Route): Promise<void> => {
      if (route.request().method() !== 'POST') {
        await route.continue();

        return;
      }

      // Chromium can discard this SPA response body before Network.getResponseBody reads it.
      const response = await route.fetch();

      loginResponseDiagnostics = await formatResponseDiagnostics(response);
      await route.fulfill({ response });
    };

    await this.page.route(isLoginEndpoint, captureLoginResponse);
    const loginResponsePromise = this.page.waitForResponse(response => {
      const url = new URL(response.url());

      return response.request().method() === 'POST'
        && url.host === apiHost
        && url.pathname.endsWith('/users/login');
    });

    await this.emailLocator.fill(email);
    await this.passwordLocator.fill(password);

    try {
      const [, loginResponse] = await Promise.all([
        this.page.waitForURL(url => !url.toString().includes('/auth/login'), { timeout: 15_000 }),
        loginResponsePromise,
        this.submitBtnLocator.click(),
      ]);

      return {
        response: loginResponse,
        responseDiagnostics: loginResponseDiagnostics,
        transitionDiagnostics,
      };
    } catch (error: unknown) {
      const diagnostics = await transitionDiagnostics.complete();
      const message = error instanceof Error ? error.message : String(error);

      throw new Error(
        `${message}\nLogin response: ${loginResponseDiagnostics}\n${diagnostics}`,
      );
    } finally {
      await this.page.unroute(isLoginEndpoint, captureLoginResponse);
    }
  }

  private async createReadinessDiagnostics(response: Response | null): Promise<string> {
    const documentDiagnostics = response
      ? await formatResponseDiagnostics(response)
      : 'main-document response=<none>';
    const title = await this.page.title().catch(() => '<unavailable>');
    const heading = await this.page.getByRole('heading').first()
      .innerText().catch(() => '<none>');
    const bodyText = await this.page.locator('body').innerText().catch(() => '<unavailable>');

    return [
      documentDiagnostics,
      `page-url=${JSON.stringify(createSafeDiagnosticPreview(this.page.url()))}`,
      `page-title=${JSON.stringify(createSafeDiagnosticPreview(title))}`,
      `visible-heading=${JSON.stringify(createSafeDiagnosticPreview(heading))}`,
      `body-text-preview=${JSON.stringify(createSafeDiagnosticPreview(bodyText))}`,
    ].join('; ');
  }
}
