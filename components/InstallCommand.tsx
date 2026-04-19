"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const command = 'npx "@opendirectory.dev/skills" list';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4 w-full max-w-md group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#856FE6]/50 to-[#5B42F3]/50 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full bg-[#0f172a] rounded-xl p-3 pl-4 font-mono text-[13px] text-white flex items-center justify-between border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center text-[#856FE6] font-bold select-none">
            <span>&gt;</span>
          </div>
          <code className="text-white/90 truncate">
            {command}
          </code>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex-shrink-0 ml-4 p-2 hover:bg-white/10 rounded-lg transition-all active:scale-95"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} className="text-white/50 group-hover:text-white transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}
