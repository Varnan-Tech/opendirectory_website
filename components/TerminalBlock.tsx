"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const commands = [
  "npx opendirectory init",
  "Fetching core skills...",
  "Loading MCP servers: Meta Ads, Twitter Lead Gen",
  "Pipeline connected. Ready to orchestrate.",
  "Run 'opendirectory --help' for available agents."
];

export function TerminalBlock() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (currentLineIndex >= commands.length) return;

    const currentCommand = commands[currentLineIndex];

    if (currentCharIndex < currentCommand.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 30 + 5);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentCommand]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12" style={{ perspective: "1200px" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-64 relative rounded-xl font-mono text-[13px] shadow-2xl"
      >
        {/* Glass background layer - separated to prevent transform/backdrop-filter rendering bugs */}
        <div className="absolute inset-0 bg-[#0a0a0a] backdrop-blur-3xl rounded-xl border border-white/[0.08] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
        </div>
      
      <div className="relative z-10 flex items-center px-4 py-3 bg-white/[0.02] border-b border-white/[0.05] rounded-t-xl">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>
        <div className="mx-auto text-white/40 text-[11px] font-medium tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-glow" />
          opendirectory — zsh
        </div>
      </div>
      
      <div className="relative z-10 p-6 h-[calc(100%-42px)] overflow-y-auto text-white/60 space-y-3 rounded-b-xl">
        {lines.map((line, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className="flex"
          >
            <span className="text-blue-400 mr-3 shrink-0">❯</span>
            <span className={
              line.startsWith("Fetching") || line.startsWith("Loading") || line.startsWith("Pipeline") 
                ? "text-white/50" 
                : line.startsWith("Run") 
                  ? "text-green-400" 
                  : "text-white/90"
            }>
              {line}
            </span>
          </motion.div>
        ))}
        {currentLineIndex < commands.length && (
          <div className="flex">
            <span className="text-blue-400 mr-3 shrink-0">❯</span>
            <span className="text-white/90">
              {commands[currentLineIndex].substring(0, currentCharIndex)}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-white/80 ml-1 align-middle"
            />
          </div>
        )}
      </div>
      </motion.div>
    </div>
  );
}
