"use client";

import React, { useState, useMemo } from "react";
import { BentoGrid, GitHubRepo } from "./BentoGrid";
import { Search } from "lucide-react";

interface FilterableSkillsProps {
  initialRepos: GitHubRepo[];
}

function getTagsForRepo(repo: GitHubRepo): string[] {
  const tags: string[] = [];
  const content = (repo.name + " " + repo.description).toLowerCase();

  if (content.includes("scraper") || content.includes("crawl")) tags.push("Scraper");
  if (content.includes("content") || content.includes("blog") || content.includes("write")) tags.push("Content");
  if (content.includes("seo") || content.includes("rank") || content.includes("keyword")) tags.push("SEO");
  if (content.includes("automation") || content.includes("pipeline") || content.includes("workflow")) tags.push("Automation");
  if (content.includes("agent") || content.includes("ai") || content.includes("bot")) tags.push("Agent");
  if (content.includes("api") || content.includes("endpoint")) tags.push("API");
  if (content.includes("cli") || content.includes("terminal")) tags.push("CLI");

  if (tags.length === 0) tags.push("Skill");
  
  return tags;
}

export function FilterableSkills({ initialRepos }: FilterableSkillsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialRepos.forEach(repo => {
      const tags = getTagsForRepo(repo);
      tags.forEach(tag => tagsSet.add(tag));
    });
    return ["All", ...Array.from(tagsSet).sort()];
  }, [initialRepos]);

  const filteredRepos = useMemo(() => {
    return initialRepos.filter(repo => {
      const repoTags = getTagsForRepo(repo);
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repoTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      if (!matchesSearch) return false;
      
      if (activeTag === "All") return true;
      
      return repoTags.includes(activeTag);
    });
  }, [initialRepos, searchQuery, activeTag]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full">
      <div className="flex flex-col gap-6 w-full lg:w-64 shrink-0 lg:sticky lg:top-24 self-start">
        <h3 className="text-xl font-bold tracking-tight text-black border-b border-black/[0.08] pb-3">Find Skills</h3>
        
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-black/40" />
          </div>
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-black/5 border-transparent rounded-lg text-[13px] text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#856FE6]/30 focus:bg-white transition-all"
          />
        </div>
        
        <div>
          <h4 className="text-[12px] font-semibold text-black/50 uppercase tracking-wider mb-3">Categories</h4>
          <div className="flex flex-row overflow-x-auto sm:flex-col gap-2 sm:gap-1.5 pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 text-left flex items-center justify-between ${
                  activeTag === tag 
                    ? "bg-[#856FE6]/10 text-[#856FE6]" 
                    : "bg-transparent text-black/60 hover:bg-black/5 hover:text-black"
                }`}
              >
                <span>{tag}</span>
                <span className="text-[11px] opacity-50">
                  {tag === "All" ? initialRepos.length : initialRepos.filter(r => getTagsForRepo(r).includes(tag)).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4 border-b border-black/[0.08] pb-2">
          <div className="flex gap-4 text-[13px] font-mono text-black/40">
            <span className="text-black font-semibold">All {filteredRepos.length}</span>
            {allTags.filter(t => t !== "All" && t !== "Skill").slice(0, 6).map(t => (
              <span key={t} className="hidden sm:inline-block cursor-pointer hover:text-black transition-colors" onClick={() => setActiveTag(t)}>
                {t.toLowerCase()} {initialRepos.filter(r => getTagsForRepo(r).includes(t)).length}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="max-h-[520px] overflow-y-auto pr-2 pb-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black/20">
            <BentoGrid repos={filteredRepos} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}
