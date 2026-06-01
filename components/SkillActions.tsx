"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Copy, Check, X, Download, Sparkles } from "lucide-react";

export function InstallButton({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("opencode");

  const platforms = [
    { id: "opencode", name: "OpenCode", flag: "opencode" },
    { id: "claude", name: "Claude Code", flag: "claude" },
    { id: "openclaw", name: "OpenClaw", flag: "openclaw" },
    { id: "hermes", name: "Hermes Agent", flag: "hermes" },
    { id: "antigravity", name: "Anti-Gravity", flag: "antigravity" },
    { id: "gemini", name: "Gemini CLI", flag: "gemini" },
  ];

  const getCommandText = (platform: string, repoName: string) => {
    if (platform === "claude") {
      return `/plugin install ${repoName}@opendirectory-marketplace`;
    }
    return `npx "@opendirectory.dev/skills" install ${repoName} --target ${platform}`;
  };

  const executeCopy = (e?: React.MouseEvent, flag?: string) => {
    if (e) e.stopPropagation();
    const targetFlag = flag || selectedPlatform;

    const command = getCommandText(targetFlag, name);
    navigator.clipboard.writeText(command);
    toast.success(`Copied command for ${platforms.find(p => p.flag === targetFlag)?.name}!`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPlatform(val);
    executeCopy(undefined, val);
  };

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="p-1.5 rounded-md bg-black/5 hover:bg-[#856FE6]/10 text-black/40 hover:text-[#856FE6] border border-black/5 hover:border-[#856FE6]/30 transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
        title="Copy install command"
      >
        <Copy className="w-3.5 h-3.5" />
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Install Skill
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#856FE6]/20 via-[#856FE6] to-[#856FE6]/20" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black tracking-tight">Select Target Platform</h3>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>

              <p className="text-[14px] text-black/70 leading-relaxed mb-6">
                Choose your autonomous AI agent from the dropdown below. The installation command for <strong className="text-black font-mono font-medium">{name}</strong> will be automatically copied.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPlatform}
                    onChange={handleSelectChange}
                    className="flex-1 bg-white border border-black/10 rounded-lg px-4 py-3 text-[14px] font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#856FE6]/30 hover:border-black/20 transition-colors cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("/vectors/chevron-down.svg")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    {platforms.map(p => (
                      <option key={p.id} value={p.flag}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={(e) => executeCopy(e)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#856FE6] hover:bg-[#856FE6]/90 text-white rounded-lg text-[14px] font-medium transition-colors shrink-0 shadow-sm"
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy</>
                    )}
                  </button>
                </div>

                <div className="bg-black text-white/90 p-4 rounded-lg font-mono text-[12px] overflow-hidden whitespace-nowrap overflow-ellipsis mt-2">
                  {getCommandText(selectedPlatform, name)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function DownloadButton({ name }: { name: string }) {
  return (
    <a
      href={`/api/download/${encodeURIComponent(name)}`}
      onClick={(e) => e.stopPropagation()}
      download
      className="p-1.5 rounded-md bg-black/5 hover:bg-[#856FE6]/10 text-black/40 hover:text-[#856FE6] border border-black/5 hover:border-[#856FE6]/30 transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
      title="Download .skill.zip"
      aria-label={`Download ${name} as .skill.zip`}
    >
      <Download className="w-3.5 h-3.5" />
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Download .zip
      </div>
    </a>
  );
}

export function ManusButton({ name }: { name: string }) {
  const manusUrl = `https://manus.im/import-skills?githubUrl=${encodeURIComponent(
    `https://github.com/Varnan-Tech/opendirectory/tree/main/skills/${name}`
  )}&utm_source=opendirectory`;

  return (
    <a
      href={manusUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="p-1.5 rounded-md bg-[#856FE6]/8 hover:bg-[#856FE6]/18 text-[#856FE6]/70 hover:text-[#856FE6] border border-[#856FE6]/15 hover:border-[#856FE6]/40 transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
      title="Open in Manus AI"
      aria-label={`Open ${name} in Manus AI`}
    >
      <Sparkles className="w-3.5 h-3.5" />
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Open in Manus
      </div>
    </a>
  );
}
