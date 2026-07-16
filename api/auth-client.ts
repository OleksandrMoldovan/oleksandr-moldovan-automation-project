import type { APIRequestContext, APIResponse } from '@playwright/test';
import { apiUrl } from '../config/environment';

interface LoginResponse {
  access_token: string;
}

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${apiUrl}/users/login`, { data: { email, password } });
  }

  async loginAndGetToken(email: string, password: string): Promise<string> {
    const response = await this.login(email, password);

    if (!response.ok()) {
      throw new Error(`Login failed with status ${response.status()}.`);
    }

    const body: unknown = await response.json();

    if (!isLoginResponse(body)) {
      throw new Error('Login response did not contain a valid access token.');
    }

    return body.access_token;
  }
}

function isLoginResponse(value: unknown): value is LoginResponse {
  if (typeof value !== 'object' || value === null) return false;

  return 'access_token' in value && typeof value.access_token === 'string'
    && value.access_token.length > 0;
}
