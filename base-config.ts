import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path:join(process.cwd(), '.env') });
export const BASE_URL: string = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
export const USER_EMAIL: string = process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com';
export const USER_PASSWORD: string = process.env.USER_PASSWORD ?? 'welcome01';
export const USER_NAME: string = process.env.USER_NAME ?? 'Jane Doe';
