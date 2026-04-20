import { db } from '../db';
import { mergedContributors } from '../db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  console.log('Deleting dependabot[bot] from mergedContributors...');
  const result = await db.delete(mergedContributors).where(eq(mergedContributors.githubUsername, 'dependabot[bot]'));
  console.log('Deleted:', result);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});