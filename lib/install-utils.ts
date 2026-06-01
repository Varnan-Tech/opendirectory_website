export const PLATFORMS = [
  { id: "opencode", name: "OpenCode", flag: "opencode" },
  { id: "claude", name: "Claude Code", flag: "claude" },
  { id: "openclaw", name: "OpenClaw", flag: "openclaw" },
  { id: "hermes", name: "Hermes Agent", flag: "hermes" },
  { id: "antigravity", name: "Anti-Gravity", flag: "antigravity" },
  { id: "gemini", name: "Gemini CLI", flag: "gemini" },
] as const;

export function getInstallCommand(repoName: string, target: string) {
  if (target === "claude") {
    return `/plugin install ${repoName}@opendirectory-marketplace`;
  }

  return `npx "@opendirectory.dev/skills" install ${repoName} --target ${target}`;
}
