import React from "react";
import { Footer } from "@/components/Footer";
import { AnimatedLogo } from "@/components/AnimatedLogo";
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

            <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-6 border-b border-black/10 pb-4">
              How to Use Our Skills
            </h2>
            
            <p className="text-black/80 leading-relaxed mb-6">
              Our skills are designed to be consumed directly by autonomous agents (like Claude Code, AutoGPT, or custom MCP servers). We do not require complex npm package installations. Instead, we use a direct repository cloning approach.
            </p>

            <div className="bg-black/5 border border-black/10 rounded-xl p-8 mb-8">
              <h3 className="text-lg font-medium tracking-tight mb-4">The Universal Agent Prompt</h3>
              <p className="text-black/70 mb-4 text-sm">
                To equip your agent with any of our skills, simply provide it with the following prompt format. Replace <code>[REPO_NAME]</code> with the specific skill you want to use.
              </p>
              
              <div className="bg-black text-white p-4 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto">
                Agent: clone this repo https://github.com/Varnan-Tech/[REPO_NAME] and read the whole README.md file in that repository to understand how to use it. If there is anything you need, like an environment variable or any dependencies, ask your human agent for it.
              </div>
            </div>

            <h3 className="text-xl font-semibold tracking-tight mt-10 mb-4">
              Why this approach?
            </h3>
            <ul className="space-y-4 text-black/80 list-disc pl-6">
              <li>
                <strong>Zero Configuration:</strong> Agents can read the repository's README to understand the skill's capabilities, input schema, and expected outputs automatically.
              </li>
              <li>
                <strong>Always Up-to-Date:</strong> Your agent pulls the latest instructions and scripts directly from the source repository.
              </li>
              <li>
                <strong>Context Awareness:</strong> By reading the README, the agent dynamically adjusts its own system prompt to properly utilize the skill.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold tracking-tight mt-16 mb-6 border-b border-black/10 pb-4">
              Example Workflow
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-[#856FE6]/10 text-[#856FE6] flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-medium mb-2">Find a Skill</h4>
                  <p className="text-black/70 text-sm">Browse the Open Directory homepage to find a skill that matches your needs (e.g., <code>blog-cover-image-cli</code>).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-[#856FE6]/10 text-[#856FE6] flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-medium mb-2">Copy the Prompt</h4>
                  <p className="text-black/70 text-sm">Click the copy icon on the skill card to copy the universal agent prompt to your clipboard.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-8 h-8 rounded-full bg-[#856FE6]/10 text-[#856FE6] flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-medium mb-2">Paste to your Agent</h4>
                  <p className="text-black/70 text-sm">Paste the prompt into your autonomous agent's chat or instruction field. The agent will clone the repo, read the instructions, and execute the skill.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
