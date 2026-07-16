import { join } from 'path';

// Setup and fixtures share this path to prevent authentication-state drift.
export const authStatePath = join(process.cwd(), 'playwright', '.auth', 'e2e-user.json');
