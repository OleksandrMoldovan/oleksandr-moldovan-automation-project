import { config as loadEnv } from 'dotenv';
import { join } from 'path';

loadEnv({ path: join(process.cwd(), '.env'), quiet: true });

export const baseUrl = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
export const apiUrl = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

function required(name: 'USER_EMAIL' | 'USER_PASSWORD' | 'USER_NAME'): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required. Copy .env.example to .env and provide a test account.`);
  }

  return value;
}

export function getTestUser() {
  return {
    email: required('USER_EMAIL'),
    password: required('USER_PASSWORD'),
    name: required('USER_NAME'),
  };
}
