import { renderLlmsTxt } from "@dualmark/core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = "https://opendirectory.dev";

  // Static collection sections
  const staticSections = [
    {
      title: "Documentation",
      description: "Learn how to integrate Open Directory agent skills into your AI agents.",
      links: [
        { title: "Documentation", href: `${baseUrl}/docs`, description: "Installation guides and setup instructions" },
      ],
    },
    {
      title: "Policies",
      links: [
        { title: "Privacy Policy", href: `${baseUrl}/privacy`, description: "How we handle your data" },
        { title: "Terms of Service", href: `${baseUrl}/terms`, description: "Terms governing use of Open Directory" },
      ],
    },
  ];

  // Fetch available skills from GitHub dynamically
  try {
    const res = await fetch(
      "https://api.github.com/repos/Varnan-Tech/opendirectory/contents/skills",
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const skillsFolders = await res.json() as { type: string; name: string }[];
      const validSkills = skillsFolders.filter((f) => f.type === "dir");

      if (validSkills.length > 0) {
        staticSections.push({
          title: "Available Skills",
          description: `${validSkills.length} open-source agent skills ready to install.`,
          links: validSkills.map((s) => ({
            title: s.name,
            href: `${baseUrl}/?skill=${s.name}`,
            description: `Install with: npx "@opendirectory.dev/skills" install ${s.name} --target [agent]`,
          })),
        });

        staticSections.push({
          title: "Installation Instructions",
          description:
            "Skills can be installed via multiple methods depending on your AI agent.",
          links: [
            {
              title: "Claude Code (Native)",
              href: `${baseUrl}/docs`,
              description:
                'Run `/plugin marketplace add Varnan-Tech/opendirectory` then `/plugin install [skill-name]@opendirectory-marketplace`',
            },
            {
              title: "Standard Installation",
              href: `${baseUrl}/docs`,
              description:
                'Run `npx "@opendirectory.dev/skills" install [skill-name] --target [agent]`',
            },
          ],
        });
      }
    }
  } catch {
    // Silently fall through — static sections still render
  }

  const body = renderLlmsTxt({
    brandName: "Open Directory",
    description:
      "The unified home for open-source agent skills designed for founders who hate marketing. Discover, install, and use AI agent skills via simple CLI commands.",
    sections: staticSections,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
    },
  });
}
