import { NextRequest, NextResponse } from 'next/server';
import { buildSkillZip, isSafeSkillName } from '@/lib/github-zip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

type RouteContext = { params: Promise<{ skillName: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { skillName } = await context.params;

  if (!isSafeSkillName(skillName)) {
    return NextResponse.json({ error: 'Invalid skill name' }, { status: 400 });
  }

  try {
    const zipBuffer = await buildSkillZip(skillName);
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${skillName}.skill.zip"`,
        'Content-Length': String(zipBuffer.byteLength),
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Skill-Name': skillName,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.startsWith('Skill not found')) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    if (message.startsWith('GitHub tree fetch failed: 403')) {
      return NextResponse.json(
        { error: 'GitHub rate limit hit. Try again later.' },
        { status: 503, headers: { 'Retry-After': '60' } }
      );
    }
    console.error('Download route error:', err);
    return NextResponse.json({ error: 'Failed to build ZIP' }, { status: 500 });
  }
}
