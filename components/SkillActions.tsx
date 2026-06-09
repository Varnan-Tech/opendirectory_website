"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Copy, Check, X, Download } from "lucide-react";
import { Manus } from "@lobehub/icons";
import { PLATFORMS, getInstallCommand } from "@/lib/install-utils";

export function InstallButton({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("opencode");
  const command = getInstallCommand(name, selectedPlatform);

  useEffect(() => {
    document.body.classList.toggle("install-modal-open", isOpen);

    return () => {
      document.body.classList.remove("install-modal-open");
    };
  }, [isOpen]);

  const executeCopy = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    void navigator.clipboard.writeText(command).then(() => {
      const platformName = PLATFORMS.find((p) => p.flag === selectedPlatform)?.name ?? "Unknown";
      toast.success(`Copied command for ${platformName}!`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="skill-card-action p-1.5 rounded-md bg-black/5 hover:bg-[#856FE6]/10 text-black/40 hover:text-[#856FE6] border border-black/5 hover:border-[#856FE6]/30 transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
        title="Install skill"
        aria-label={`Install ${name}`}
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
                <button type="button" onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-black/5 rounded-full transition-colors" aria-label="Close install dialog">
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>

              <p className="text-[14px] text-black/70 leading-relaxed mb-6">
                Choose your autonomous AI agent. The command for <strong className="text-black font-mono font-medium">{name}</strong> updates below so you can copy exactly what you need.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="flex-1 bg-white border border-black/10 rounded-lg px-4 py-3 text-[14px] font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#856FE6]/30 hover:border-black/20 transition-colors cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("/vectors/chevron-down.svg")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto" }}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p.id} value={p.flag}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={executeCopy}
                    className="flex h-[46px] w-[52px] items-center justify-center bg-[#856FE6] hover:bg-[#856FE6]/90 text-white rounded-lg transition-colors shrink-0 shadow-sm"
                    title="Copy command"
                    aria-label="Copy install command"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={executeCopy}
                  className="group/code relative mt-2 overflow-hidden rounded-lg bg-black p-4 pr-14 text-left font-mono text-[12px] text-white/90 shadow-inner transition-colors hover:bg-black/90"
                  aria-label="Copy install command"
                >
                  <span className="block whitespace-pre-wrap break-all">{command}</span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 transition-colors group-hover/code:text-white">
                    {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  </span>
                </button>
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
      className="skill-card-action p-1.5 rounded-md bg-black/5 hover:bg-[#856FE6]/10 text-black/40 hover:text-[#856FE6] border border-black/5 hover:border-[#856FE6]/30 transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
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
      className="skill-card-action p-1.5 rounded-md bg-[#856FE6]/10 hover:bg-[#856FE6] text-[#856FE6] hover:text-white border border-[#856FE6]/20 hover:border-[#856FE6] transition-all z-20 relative group/btn flex items-center justify-center shrink-0"
      title="Install in Manus AI"
      aria-label={`Install ${name} in Manus AI`}
    >
      <Manus size={14} />
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Install in Manus AI
      </div>
    </a>
  );
}
