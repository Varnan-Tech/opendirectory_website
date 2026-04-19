import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { mergedContributors } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-hub-signature-256');
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!secret) {
      console.error('GITHUB_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const bodyText = await req.text();
    
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(bodyText).digest('hex');

    if (signature !== digest) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = JSON.parse(bodyText);

    if (
      payload.action === 'closed' &&
      payload.pull_request &&
      payload.pull_request.merged === true
    ) {
      const username = payload.pull_request.user?.login;
      const email = payload.pull_request.user?.email || `${username}@users.noreply.github.com`;

      if (username) {
        await db.insert(mergedContributors).values({
          githubUsername: username,
          email: email,
        }).onConflictDoNothing({ target: mergedContributors.githubUsername });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
