import { config } from 'dotenv';
config();
import postgres from 'postgres';

async function main() {
  const sql = postgres(process.env.DATABASE_URL!);
  await sql`DROP TABLE IF EXISTS merch_claims CASCADE;`;
  console.log('Dropped merch_claims table');
  process.exit(0);
}

main().catch(console.error);