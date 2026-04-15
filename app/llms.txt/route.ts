import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/Varnan-Tech/opendirectory/contents/skills", {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch skills");
    }
    
    const skillsFolders = await res.json();
    
    let text = `# Open Directory - Agent Skills\n\n`;
    text += `> Open Directory is the unified home for open-source agent skills, CLI utilities, and automation pipelines designed for autonomous agents like Claude Code, OpenCode, and Gemini.\n\n`;
    
    text += `## Available Skills\n\n`;
    
    for (const folder of skillsFolders) {
      if (folder.type === 'dir') {
         text += `- **${folder.name}**\n`;
         text += `  - Claude Code: \`/plugin install ${folder.name}@opendirectory-marketplace\`\n`;
         text += `  - Other Agents: \`npx "@opendirectory.dev/skills" install ${folder.name} --target [opencode|antigravity|hermes|gemini]\`\n\n`;
      }
    }
    
    text += `\n## Global Installation Instructions\n`;
    text += `### Claude Code (Native)\n`;
    text += `1. \`/plugin marketplace add Varnan-Tech/opendirectory\`\n`;
    text += `2. \`/plugin install [skill-name]@opendirectory-marketplace\`\n\n`;
    
    text += `### Standard Installation\n`;
    text += `\`npx "@opendirectory.dev/skills" install [skill-name] --target [agent]\`\n`;

    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    return new NextResponse("Error generating llms.txt", { status: 500 });
  }
}