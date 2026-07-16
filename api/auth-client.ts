import type { APIRequestContext, APIResponse } from '@playwright/test';
import { apiUrl } from '../config/environment';

interface LoginResponse {
  access_token: string;
}

interface AuthenticationResponse {
  headers(): Record<string, string>;
  status(): number;
  statusText(): string;
  text(): Promise<string>;
  url(): string;
}

const bodyPreviewLength = 300;
const sensitiveFieldName = /authorization|cookie|password|secret|token|api[-_]?key/i;
const sensitiveTextField = [
  'access[_-]?token',
  'refresh[_-]?token',
  'authorization',
  'password',
  'secret',
  'api[_-]?key',
].join('|');
const sensitiveTextAssignment = new RegExp(
  `((?:${sensitiveTextField})\\s*[:=]\\s*)[^\\s,;]+`,
  'gi',
);

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${apiUrl}/users/login`, { data: { email, password } });
  }

  async loginAndGetToken(email: string, password: string): Promise<string> {
    const response = await this.login(email, password);

    if (!response.ok()) {
      throw new Error(`Login failed. ${await formatResponseDiagnostics(response)}`);
    }

    // Treat external JSON as untrusted until its required shape is validated.
    let body: unknown;

    try {
      body = await response.json();
    } catch {
      throw new Error(`Login response was not valid JSON. ${await formatResponseDiagnostics(response)}`);
    }

    if (!isLoginResponse(body)) {
      throw new Error(
        `Login response did not contain a valid access token. ${await formatResponseDiagnostics(response)}`,
      );
    }

    return body.access_token;
  }
}

export async function formatResponseDiagnostics(
  response: AuthenticationResponse,
): Promise<string> {
  const contentType = response.headers()['content-type'] ?? '<missing>';
  const rawBody = await readResponseBody(response);
  const { format, preview } = createBodyPreview(rawBody, contentType);

  return [
    `status=${response.status()} ${response.statusText() || '<no status text>'}`,
    `content-type=${JSON.stringify(contentType)}`,
    `body-format=${format}`,
    `url=${JSON.stringify(sanitizeUrl(response.url()))}`,
    `body-preview=${JSON.stringify(preview)}`,
  ].join('; ');
}

export const formatAuthenticationResponse = formatResponseDiagnostics;

async function readResponseBody(response: AuthenticationResponse): Promise<string> {
  try {
    return await response.text();
  } catch (error: unknown) {
    return `[body unavailable: ${error instanceof Error ? error.message : 'unknown error'}]`;
  }
}

function createBodyPreview(body: string, contentType: string): { format: string; preview: string } {
  const trimmed = body.trim();

  if (!trimmed) {
    return { format: 'empty', preview: '<empty>' };
  }

  if (contentType.toLowerCase().includes('json') || /^[{[]/.test(trimmed)) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      const sanitized = JSON.stringify(redactSensitiveFields(parsed));

      return { format: 'json', preview: truncatePreview(sanitizeTokenLikeText(sanitized)) };
    } catch {
      // Fall through so malformed JSON is still visible as a safe text preview.
    }
  }

  const format = /<html|<!doctype html/i.test(trimmed) ? 'html' : 'text';
  const singleLine = trimmed.replace(/\s+/g, ' ');

  return { format, preview: truncatePreview(sanitizeTokenLikeText(singleLine)) };
}

function redactSensitiveFields(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(item => redactSensitiveFields(item));
  }

  if (typeof value !== 'object' || value === null) {
    return typeof value === 'string' ? sanitizeTokenLikeText(value) : value;
  }

  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    sensitiveFieldName.test(key) ? '[REDACTED]' : redactSensitiveFields(item),
  ]));
}

function sanitizeUrl(value: string): string {
  try {
    const url = new URL(value);

    for (const key of url.searchParams.keys()) {
      if (sensitiveFieldName.test(key)) {
        url.searchParams.set(key, '[REDACTED]');
      }
    }

    return sanitizeTokenLikeText(url.toString());
  } catch {
    return sanitizeTokenLikeText(value);
  }
}

function sanitizeTokenLikeText(value: string): string {
  return value
    .replace(sensitiveTextAssignment, '$1[REDACTED]')
    .replace(/\bBearer\s+[^\s"']+/gi, 'Bearer [REDACTED]')
    .replace(/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, '[REDACTED_TOKEN]');
}

function truncatePreview(value: string): string {
  return value.length <= bodyPreviewLength ? value : `${value.slice(0, bodyPreviewLength)}…`;
}

export function createSafeDiagnosticPreview(value: string): string {
  return truncatePreview(sanitizeTokenLikeText(value.replace(/\s+/g, ' ').trim()));
}

function isLoginResponse(value: unknown): value is LoginResponse {
  if (typeof value !== 'object' || value === null) return false;

  return 'access_token' in value && typeof value.access_token === 'string'
    && value.access_token.length > 0;
}
