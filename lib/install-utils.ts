export const PLATFORMS = [
  { id: "skillssh", name: "skills.sh", flag: "skills.sh" },
  { id: "opencode", name: "OpenCode", flag: "opencode" },
  { id: "claude", name: "Claude Code", flag: "claude" },
  { id: "openclaw", name: "OpenClaw", flag: "openclaw" },
  { id: "hermes", name: "Hermes Agent", flag: "hermes" },
  { id: "antigravity", name: "Anti-Gravity", flag: "antigravity" },
  { id: "gemini", name: "Gemini CLI", flag: "gemini" },
] as const;

export function getInstallCommand(skillName: string, target: string) {
  if (target === "claude") {
    return `/plugin install ${skillName}@opendirectory-marketplace`;
  }
  if (target === "skills.sh") {
    return `npx skills add Varnan-Tech/opendirectory --skill ${skillName}`;
  }
  return `npx "@opendirectory.dev/skills" install ${skillName} --target ${target}`;
}
