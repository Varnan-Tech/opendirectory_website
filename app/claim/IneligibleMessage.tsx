import { AnimatedLogo } from '@/components/AnimatedLogo';
import { signOut } from '@/auth';

export default function IneligibleMessage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-8 shadow-xl text-center flex flex-col items-center">
        <div className="mb-6">
          <AnimatedLogo />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-4 text-red-500">Not Eligible</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, you are not eligible to claim merch. Ensure your PR is merged to the main repository.
        </p>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}
        >
          <button type="submit" className="text-sm text-muted-foreground hover:text-foreground underline transition-colors">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}