import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

if (!connectionString && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  console.warn('DATABASE_URL is not set. Database operations will fail.');
}

const client = postgres(connectionString || 'postgres://dummy:dummy@localhost:5432/dummy');
export const db = drizzle(client, { schema });
