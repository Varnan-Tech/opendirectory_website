"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star, Copy, Check, Code2, Globe, Search, FileText,
  Zap, Bot, Layers, TerminalSquare, GitPullRequest, Mail, Package,
} from "lucide-react";
import { toast } from "sonner";
import type { GitHubRepo } from "./BentoGrid";

// ─── Config ────────────────────────────────────────────────────────────────
// Add or remove skill slugs here. Order is preserved in the UI.
export const FEATURED_SKILL_SLUGS = [
  "position-me",
  "brand-alchemy",
  "blog-cover-image-cli",
  "yc-intent-radar-skill",
  "pricing-finder",
  "competitor-pr-finder",
  "cold-email-verifier",
];
// ───────────────────────────────────────────────────────────────────────────

interface FeaturedSkillsSectionProps {
  allRepos: GitHubRepo[];
  onSelect: (repo: GitHubRepo) => void;
}

function formatSkillName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function SkillIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("google") || n.includes("trends"))
    return <img src="/vectors/google-icon.svg" alt="Google" className="w-4 h-4" />;
  if (n.includes("yc") || n.includes("ycombinator"))
    return (
      <div className="w-4 h-4 bg-[#FF6600] flex items-center justify-center rounded-sm">
        <span className="text-white font-bold text-[8px]">Y</span>
      </div>
    );
  if (n.includes("twitter") || n.includes("x-"))
    return <img src="/vectors/twitter-icon.svg" alt="Twitter" className="w-4 h-4" />;
  if (n.includes("github") || n.includes("code"))
    return <img src="/vectors/github-icon.svg" alt="GitHub" className="w-4 h-4" />;
  if (n.includes("producthunt") || n.includes("product-hunt"))
    return <img src="/vectors/producthunt-icon.svg" alt="ProductHunt" className="w-4 h-4" />;
  if (n.includes("meta") || n.includes("facebook") || n.includes("ads"))
    return <img src="/vectors/meta-icon.svg" alt="Meta" className="w-4 h-4" />;
  if (n.includes("reddit"))
    return <img src="/vectors/reddit-icon.svg" alt="Reddit" className="w-4 h-4" />;
  if (n.includes("amazon"))
    return <Package className="w-4 h-4 text-[#FF9900]" />;
  if (n.includes("explain-this-pr") || n.includes("-pr"))
    return <GitPullRequest className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("newsletter") || n.includes("email"))
    return <Mail className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("scraper") || n.includes("luma"))
    return <Search className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("content") || n.includes("blog"))
    return <FileText className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("seo")) return <Globe className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("agent") || n.includes("bot"))
    return <Bot className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("pipeline") || n.includes("lead"))
    return <Layers className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("suite") || n.includes("productivity"))
    return <Zap className="w-4 h-4 text-[#856FE6]" />;
  if (n.includes("cli")) return <TerminalSquare className="w-4 h-4 text-[#856FE6]" />;
  return <Code2 className="w-4 h-4 text-[#856FE6]" />;
}

function InstallButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cmd = `npx "@opendirectory.dev/skills" install ${name} --target opencode`;
    navigator.clipboard.writeText(cmd);
    toast.success(`Copied install command!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#856FE6]/10 hover:bg-[#856FE6]/20 text-[#856FE6] text-[11px] font-semibold transition-all border border-[#856FE6]/20 hover:border-[#856FE6]/40 shrink-0"
    >
      {copied ? (
        <Check className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copied!" : "Install"}
    </motion.button>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: EASE },
  }),
};

export function FeaturedSkillsSection({ allRepos, onSelect }: FeaturedSkillsSectionProps) {
  const featured = FEATURED_SKILL_SLUGS
    .map((slug) => allRepos.find((r) => r.name === slug))
    .filter(Boolean) as GitHubRepo[];

  if (featured.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-[#856FE6] fill-[#856FE6]" />
          <span className="text-[13px] font-semibold tracking-tight text-black">
            Featured Skills
          </span>
        </div>
        <div className="flex-1 h-px bg-black/[0.07]" />
        <span className="text-[11px] text-black/35 font-medium tabular-nums">
          {featured.length} skills
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featured.map((skill, i) => (
          <motion.div
            key={skill.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -3, transition: { duration: 0.18 } }}
            onClick={() => onSelect(skill)}
            className="group relative flex flex-col bg-white border border-black/[0.08] rounded-xl overflow-hidden hover:border-[#856FE6]/35 hover:shadow-[0_6px_24px_rgba(133,111,230,0.11)] transition-[border-color,box-shadow] duration-200 cursor-pointer"
          >
            {/* Animated top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#856FE6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#856FE6]/[0.035] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl" />

            <div className="relative p-4 flex flex-col gap-3 h-full">
              {/* Top row: icon + name + featured badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#856FE6]/8 border border-[#856FE6]/12 flex items-center justify-center shrink-0 group-hover:bg-[#856FE6]/14 transition-colors">
                    <SkillIcon name={skill.name} />
                  </div>
                  {/* Skill name — click opens GitHub, card click opens modal */}
                  <h4
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://github.com/Varnan-Tech/opendirectory/tree/main/skills/${skill.name}`,
                        "_blank"
                      );
                    }}
                    className="text-[13px] font-semibold text-black/80 group-hover:text-[#856FE6] transition-colors tracking-tight leading-snug truncate hover:underline"
                  >
                    {formatSkillName(skill.name)}
                  </h4>
                </div>
                <div className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#856FE6]/10 border border-[#856FE6]/20">
                  <Star className="w-2.5 h-2.5 text-[#856FE6] fill-[#856FE6]" />
                  <span className="text-[9.5px] font-semibold text-[#856FE6] tracking-wide">
                    Featured
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[12px] text-black/50 leading-relaxed line-clamp-2 flex-1">
                {skill.description || "Open source agent skill for autonomous workflows."}
              </p>

              {/* Footer: slug + install */}
              <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.05]">
                <span className="font-mono text-[10.5px] text-black/28 truncate mr-2">
                  {skill.name}
                </span>
                <InstallButton name={skill.name} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
