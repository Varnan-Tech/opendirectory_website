import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';
const urlWithSsl = connectionString.includes("sslmode=") 
  ? connectionString 
  : connectionString ? `${connectionString}${connectionString.includes("?") ? "&" : "?"}sslmode=require` : '';

if (!connectionString && process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  console.warn('DATABASE_URL is not set. Database operations will fail.');
}

const client = postgres(urlWithSsl || 'postgres://dummy:dummy@localhost:5432/dummy');
export const db = drizzle(client, { schema });
