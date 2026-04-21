import React from "react";
import { Footer } from "@/components/Footer";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { DocsAnimation } from "@/components/DocsAnimation";
import { ContributeAnimation } from "@/components/ContributeAnimation";
import { Button } from "@/components/ui/neon-button";
import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black overflow-x-hidden selection:bg-black selection:text-white">
      <div className="bg-noise" />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center z-30 relative border-b border-black/[0.05]">
        <div className="flex items-center gap-3">
          <Link href="/">
            <AnimatedLogo />
          </Link>
        </div>
      </header>

      <section className="relative w-full z-10 flex-1">
        <div className="w-full max-w-[800px] mx-auto px-6 pt-20 pb-32">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8 text-black">
            Documentation
          </h1>
          
          <div className="prose prose-lg prose-black max-w-none">
            <p className="text-xl text-black/60 leading-relaxed mb-12">
              Learn how to integrate our open-source agent skills and automation pipelines into your autonomous agents.
            </p>

            <DocsAnimation />

            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-6 border-b border-black/10 pb-4">
              Step-by-Step Installation Guide
            </h2>
            
            <p className="text-black/80 leading-relaxed mb-6">
              Our skills are designed to be consumed directly by autonomous AI agents (like Claude Code, OpenCode, Codex, or Gemini CLI). You don't need to be a software engineer to install these! 
            </p>

            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-6 border-b border-black/10 pb-4">
              Native Installation (Claude Code Only)
            </h2>
            <div className="bg-[#856FE6]/5 border border-[#856FE6]/20 rounded-xl p-8 mb-12">
              <p className="text-black/80 leading-relaxed mb-6">
                Users who exclusively use Anthropic's Claude Code can add Open Directory as a native community marketplace directly inside their Claude interface. This allows you to install skills using Claude's built-in plugin system.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-black/70 mb-2">1. Add the Open Directory marketplace</h4>
                  <div className="bg-black text-white p-4 rounded-lg font-mono text-sm shadow-inner">
                    /plugin marketplace add Varnan-Tech/opendirectory
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black/70 mb-2">2. Install a skill directly</h4>
                  <div className="bg-black text-white p-4 rounded-lg font-mono text-sm shadow-inner">
                    /plugin install [SKILL-NAME]@opendirectory-marketplace
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-6 border-b border-black/10 pb-4">
              Manual Installation (Claude Desktop / Web App)
            </h2>
            <div className="bg-[#856FE6]/5 border border-[#856FE6]/20 rounded-xl p-8 mb-12">
              <p className="text-black/80 leading-relaxed mb-6">
                If you use the visual Claude Desktop App or the Claude.ai Web Interface, you can install skills manually via the Custom Skills interface.
              </p>
              
              <div className="mb-8">
                <video 
                  src="/tutorial.webm" 
                  controls 
                  playsInline
                  preload="metadata"
                  className="max-w-full w-full rounded-lg shadow-sm border border-black/10 block bg-black"
                >
                  <source src="/tutorial.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight mb-4">Step 1: Download the skill from GitHub</h3>
                  <ul className="list-decimal pl-5 space-y-2 text-black/80">
                    <li>Copy the URL of this specific skill folder from your browser's address bar.</li>
                    <li>Go to <a href="https://download-directory.github.io/" target="_blank" rel="noopener noreferrer" className="text-[#856FE6] hover:underline font-medium">download-directory.github.io</a>.</li>
                    <li>Paste the URL and click <strong>Enter</strong> to download.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold tracking-tight mb-4">Step 2: Install the Skill in Claude</h3>
                  <ul className="list-decimal pl-5 space-y-2 text-black/80 mb-4">
                    <li>Open your <strong>Claude desktop app</strong>.</li>
                    <li>Go to the sidebar on the left side and click on the <strong>Customize</strong> section.</li>
                    <li>Click on the <strong>Skills</strong> tab, then click on the <strong>+</strong> (plus) icon button to create a new skill.</li>
                    <li>Choose the option to <strong>Upload a skill</strong>, and drag and drop the <code>.zip</code> file (or you can extract it and drop the folder, both work).</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mt-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> For some skills (like <code>position-me</code>), the <code>SKILL.md</code> file might be located inside a subfolder. Always make sure you are uploading the specific folder that contains the <code>SKILL.md</code> file!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-6 border-b border-black/10 pb-4">
              Standard Installation (Other Agents)
            </h2>
            <p className="text-black/80 leading-relaxed mb-6">
              For other agents like OpenCode, Hermes, or Codex, we use a convenient <code>npx</code> command to fetch and install skills directly into your AI agent.
            </p>

            <div className="relative space-y-12 mt-10 pb-4">
              
              <div className="absolute left-[19px] top-6 bottom-0 w-0.5 z-[-1]">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line 
                    x1="0" y1="0" x2="0" y2="100%" 
                    stroke="url(#gradient)" 
                    strokeWidth="2" 
                    strokeDasharray="8 8" 
                    className="animate-flow"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#856FE6" stopOpacity="0.1" />
                      <stop offset="20%" stopColor="#856FE6" stopOpacity="1" />
                      <stop offset="80%" stopColor="#856FE6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#856FE6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-[#856FE6] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#856FE6]/20">1</div>
                  <h3 className="text-xl font-semibold tracking-tight m-0">Install Node.js (Prerequisite)</h3>
                </div>
                <div className="pl-14 text-black/80">
                  <p className="mb-4">
                    Before you can run the installation command, your computer needs a program called <strong>Node.js</strong>. It allows your computer to run the <code>npx</code> command.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Go to the official website: <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-[#856FE6] hover:underline font-medium">nodejs.org</a></li>
                    <li>Download the version labeled <strong>"Recommended For Most Users"</strong> (LTS).</li>
                    <li>Open the downloaded file and click "Next" through the standard installation steps (you don't need to change any default settings).</li>
                  </ul>
                  <p className="text-sm text-black/60 italic">If you already have Node.js installed, you can skip this step entirely.</p>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-[#856FE6] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#856FE6]/20">2</div>
                  <h3 className="text-xl font-semibold tracking-tight m-0">Find Your Skill & Copy the Command</h3>
                </div>
                <div className="pl-14 text-black/80">
                  <p className="mb-4">
                    Browse the Open Directory homepage to find the exact skill you want your AI to learn (for example, the <code>blog-cover-image-cli</code>).
                  </p>
                  <p className="mb-4">
                    On the bottom right of every skill card, you will see a small <strong>copy icon</strong>. Click it! This will copy the exact magic command you need to your clipboard.
                  </p>
                  <div className="bg-black/5 border border-black/10 rounded-xl p-6">
                    <p className="text-sm font-medium mb-3 text-black/60">The copied command will look like this:</p>
                    <div className="bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto shadow-inner">
                      npx "@opendirectory.dev/skills" install [SKILL-NAME] --target claude
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-[#856FE6] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#856FE6]/20">3</div>
                  <h3 className="text-xl font-semibold tracking-tight m-0">Open Your Terminal</h3>
                </div>
                <div className="pl-14 text-black/80">
                  <p className="mb-4">
                    You need to paste that command into your computer's "Terminal" or "Command Prompt".
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Mac users:</strong> Press <code>Cmd + Space</code>, type "Terminal", and hit Enter.</li>
                    <li><strong>Windows users:</strong> Press the Windows key, type "cmd" or "Command Prompt", and hit Enter.</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-none w-10 h-10 rounded-full bg-[#856FE6] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#856FE6]/20">4</div>
                  <h3 className="text-xl font-semibold tracking-tight m-0">Paste & Press Enter</h3>
                </div>
                <div className="pl-14 text-black/80">
                  <p className="mb-4">
                    Once the black terminal window is open, simply paste the command you copied in Step 2. (On Windows, you can usually just right-click to paste). 
                  </p>
                  <p className="mb-4">
                    Press <strong>Enter</strong>. You will see some text scrolling by as your computer reaches out to Open Directory and securely downloads the skill directly into your AI agent.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-4">
                    <p className="text-green-800 font-medium text-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Success!
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Once the text stops, the installation is complete. You can close the terminal window. Your AI agent now possesses the new skill and is ready to work!
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-6 border-b border-black/10 pb-4">
              Advanced: Selecting Your AI Target (npx only)
            </h2>
            <p className="text-black/80 leading-relaxed mb-6">
              By default, the copied <code>npx</code> command targets <strong>OpenCode</strong>. If you are using a different AI agent, you can manually change the <code>--target</code> flag at the end of the command before pressing Enter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
                <p className="font-semibold text-black mb-1">OpenCode</p>
                <code className="text-sm text-[#856FE6] bg-[#856FE6]/10 px-2 py-1 rounded">--target opencode</code>
              </div>
              <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
                <p className="font-semibold text-black mb-1">Codex</p>
                <code className="text-sm text-[#856FE6] bg-[#856FE6]/10 px-2 py-1 rounded">--target codex</code>
              </div>
              <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
                <p className="font-semibold text-black mb-1">Gemini CLI</p>
                <code className="text-sm text-[#856FE6] bg-[#856FE6]/10 px-2 py-1 rounded">--target gemini</code>
              </div>
              <div className="border border-black/10 rounded-lg p-4 bg-white shadow-sm">
                <p className="font-semibold text-black mb-1">Anti-Gravity</p>
                <code className="text-sm text-[#856FE6] bg-[#856FE6]/10 px-2 py-1 rounded">--target antigravity</code>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-6 border-b border-black/10 pb-4">
              How it works under the hood
            </h2>
            <p className="text-black/80 leading-relaxed mb-6">
              When you run our <code>npx</code> command, the tool acts as a bridge between the open-source GitHub repository and your local AI environment. Here is exactly what happens in the background:
            </p>
            <ol className="list-decimal pl-5 space-y-4 text-black/80">
              <li><strong>Registry Lookup:</strong> The CLI fetches the latest skill package definition from the Open Directory manifest.</li>
              <li><strong>Secure Download:</strong> It downloads the prompt instructions, tool definitions (if any), and system guidelines associated with the skill.</li>
              <li><strong>Target Injection:</strong> Depending on the <code>--target</code> flag you provided, it writes these definitions into your specific agent's local configuration file (e.g., <code>.claude.json</code> or your global MCP config).</li>
              <li><strong>Context Priming:</strong> The skill is now "memorized" by your AI. The next time you open your agent, it automatically knows the exact steps, prompts, and APIs needed to execute the skill flawlessly.</li>
            </ol>

            <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-6 border-b border-black/10 pb-4">
              Contribute to Open Directory
            </h2>
            <div className="flex flex-col items-center justify-center text-center gap-8 py-8">
              <ContributeAnimation />
              
              <p className="text-black/60 text-lg max-w-2xl leading-relaxed">
                Have you built an innovative skill or pipeline? Join our open-source ecosystem and share it with the world. We welcome contributions that help autonomous agents do more.
              </p>
              
              <div className="flex gap-4 mt-4">
                <a href="https://github.com/Varnan-Tech/opendirectory/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                  <Button variant="solid" size="lg" className="font-medium tracking-tight bg-black text-white hover:bg-black/80">
                    View Guidelines
                  </Button>
                </a>
                <a href="https://github.com/Varnan-Tech/opendirectory" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="lg" neon={true} className="font-medium tracking-tight border border-black/10 text-black hover:bg-black/5 bg-transparent">
                    Go to GitHub
                  </Button>
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-6 border-b border-black/10 pb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4">
              <details className="group border border-black/10 rounded-lg bg-white overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-black hover:bg-black/5 transition-colors">
                  "npx is not recognized as an internal or external command"
                  <span className="text-[#856FE6] group-open:-rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 pt-0 text-black/70 text-sm">
                  This error means Node.js is not installed on your computer, or your terminal hasn't recognized it yet. Please go back to Step 1 and download Node.js. If you just installed it, completely close your terminal window and open a new one to refresh it.
                </div>
              </details>
              
              <details className="group border border-black/10 rounded-lg bg-white overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-black hover:bg-black/5 transition-colors">
                  My AI agent says it doesn't know the skill
                  <span className="text-[#856FE6] group-open:-rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 pt-0 text-black/70 text-sm">
                  Ensure you used the correct <code>--target</code> flag during installation. Also, you must completely restart your AI agent (close the window and reopen it) for it to load the newly installed skill configurations.
                </div>
              </details>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
