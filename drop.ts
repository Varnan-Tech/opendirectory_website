import { config } from 'dotenv';
config();
import postgres from 'postgres';

async function main() {
  const databaseUrl = process.env.DATABASE_URL!;
  const urlWithSsl = databaseUrl.includes("sslmode=") 
    ? databaseUrl 
    : `${databaseUrl}${databaseUrl.includes("?") ? "&" : "?"}sslmode=require`;
  const sql = postgres(urlWithSsl);
  await sql`DROP TABLE IF EXISTS merch_claims CASCADE;`;
  console.log('Dropped merch_claims table');
  process.exit(0);
}

main().catch(console.error);