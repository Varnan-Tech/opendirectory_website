import { auth, signIn } from '@/auth';
import ClaimForm from './ClaimForm';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { db } from '@/db';
import { mergedContributors } from '@/db/schema';
import { eq } from 'drizzle-orm';
import IneligibleMessage from './IneligibleMessage';
import AlreadyClaimedMessage from './AlreadyClaimedMessage';

export default async function ClaimPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">
          <div className="mb-6">
            <AnimatedLogo />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-4">Claim Your Merch</h2>
          <p className="text-muted-foreground mb-8">Sign in with GitHub to verify your eligibility.</p>
          <form
            action={async () => {
              "use server"
              await signIn("github")
            }}
          >
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Sign in with GitHub
            </button>
          </form>
        </div>
      </div>
    );
  }

  const githubUsername = (session.user as any).login;

  if (!githubUsername) {
    return <IneligibleMessage />;
  }

  const contributor = await db.query.mergedContributors.findFirst({
    where: eq(mergedContributors.githubUsername, githubUsername),
  });

  if (!contributor) {
    return <IneligibleMessage />;
  }

  if (contributor.hasClaimed) {
    return <AlreadyClaimedMessage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
      <ClaimForm githubEmail={session.user.email || githubUsername} />
    </div>
  );
}