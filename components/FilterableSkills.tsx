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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-black/40" />
          </div>
          <input
            type="text"
            placeholder="Search skills by name, description, or tag"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-black/[0.08] rounded-2xl text-[14px] text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#856FE6]/20 focus:border-[#856FE6]/40 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                activeTag === tag 
                  ? "bg-black text-white border border-black shadow-sm" 
                  : "bg-white text-black/60 border border-black/[0.08] hover:border-black/20 hover:text-black hover:bg-black/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      <BentoGrid repos={filteredRepos} />
    </div>
  );
}
