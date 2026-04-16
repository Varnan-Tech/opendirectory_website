"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { 
  Code2, 
  Globe, 
  Search,
  FileText,
  Zap,
  Bot,
  Layers,
  Check,
  Copy,
  TerminalSquare,
  X,
  GitPullRequest,
  Mail,
  Package
} from "lucide-react";

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

interface BentoGridProps {
  repos: GitHubRepo[];
}

function BrandIcon({ name }: { name: string }) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("google") || lowerName.includes("trends")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
      </svg>
    );
  }
  
  if (lowerName.includes("yc") || lowerName.includes("ycombinator")) {
    return (
      <div className="w-5 h-5 bg-[#FF6600] flex items-center justify-center rounded-sm">
        <span className="text-white font-bold text-[10px]">Y</span>
      </div>
    );
  }
  
  if (lowerName.includes("twitter") || lowerName.includes("x-")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 1200 1227">
        <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/>
      </svg>
    );
  }

  if (lowerName.includes("github") || lowerName.includes("code")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
    );
  }
  
  if (lowerName.includes("producthunt") || lowerName.includes("product-hunt")) {
    return (
      <svg viewBox="0 0 40 40" className="w-5 h-5">
        <path fill="#da552f" d="M40 20c0 11.045-8.955 20-20 20S0 31.045 0 20 8.955 0 20 0s20 8.955 20 20z"></path>
        <path fill="#fff" d="M22.667 20H17v-6h5.667c1.73 0 3.133 1.403 3.133 3.133 0 1.73-1.403 3.134-3.133 3.134m0-9.333H13.667v18.666H17v-6h5.667c3.57 0 6.466-2.897 6.466-6.467 0-3.57-2.896-6.466-6.466-6.466"></path>
      </svg>
    );
  }

  if (lowerName.includes("meta") || lowerName.includes("facebook") || lowerName.includes("ads")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#0668E1" d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a7 7 0 0 0 .265.86a5.3 5.3 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927c1.497 0 2.633-.671 3.965-2.444c.76-1.012 1.144-1.626 2.663-4.32l.756-1.339l.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314c1.046.987 1.992 1.22 3.06 1.22c1.075 0 1.876-.355 2.455-.843a3.7 3.7 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745c0-2.72-.681-5.357-2.084-7.45c-1.282-1.912-2.957-2.93-4.716-2.93c-1.047 0-2.088.467-3.053 1.308c-.652.57-1.257 1.29-1.82 2.05c-.69-.875-1.335-1.547-1.958-2.056c-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999c1.132 1.748 1.647 4.195 1.647 6.4c0 1.548-.368 2.9-1.839 2.9c-.58 0-1.027-.23-1.664-1.004c-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a45 45 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327c1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446c.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338c-1.191 1.649-1.81 1.817-2.486 1.817c-.524 0-1.038-.237-1.383-.794c-.263-.426-.464-1.13-.464-2.046c0-2.221.63-4.535 1.66-6.088c.454-.687.964-1.226 1.533-1.533a2.26 2.26 0 0 1 1.088-.285"/>
      </svg>
    );
  }

  if (lowerName.includes("reddit")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#FF4500" d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.562-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    );
  }

  if (lowerName.includes("amazon")) {
    return <Package className="w-5 h-5 text-[#FF9900]" />;
  }

  if (lowerName.includes("explain-this-pr") || lowerName.includes("pr")) {
    return <GitPullRequest className="w-5 h-5 text-[#856FE6]" />;
  }

  if (lowerName.includes("newsletter") || lowerName.includes("email")) {
    return <Mail className="w-5 h-5 text-[#856FE6]" />;
  }

  if (lowerName.includes("scraper") || lowerName.includes("luma")) return <Search className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("content") || lowerName.includes("blog")) return <FileText className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("seo")) return <Globe className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("agent") || lowerName.includes("bot") || lowerName.includes("karma")) return <Bot className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("pipeline") || lowerName.includes("lead")) return <Layers className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("suite") || lowerName.includes("productivity")) return <Zap className="w-5 h-5 text-[#856FE6]" />;
  if (lowerName.includes("cli")) return <TerminalSquare className="w-5 h-5 text-[#856FE6]" />;
  
  return <Code2 className="w-5 h-5 text-black/40 group-hover:text-[#856FE6] transition-colors" />;
}

function CategoryTags({ name, description }: { name: string, description: string }) {
  const tags: string[] = [];
  const content = (name + " " + description).toLowerCase();

  if (content.includes("scraper") || content.includes("crawl")) tags.push("#Scraper");
  if (content.includes("content") || content.includes("blog") || content.includes("write")) tags.push("#Content");
  if (content.includes("seo") || content.includes("rank") || content.includes("keyword")) tags.push("#SEO");
  if (content.includes("automation") || content.includes("pipeline") || content.includes("workflow")) tags.push("#Automation");
  if (content.includes("agent") || content.includes("ai") || content.includes("bot")) tags.push("#Agent");
  if (content.includes("api") || content.includes("endpoint")) tags.push("#API");
  if (content.includes("cli") || content.includes("terminal")) tags.push("#CLI");

  if (tags.length === 0) tags.push("#Skill");

  return (
    <div className="flex gap-2 ml-auto">
      {tags.slice(0, 2).map(tag => (
        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#856FE6]/10 text-[#856FE6] border border-[#856FE6]/20">
          {tag}
        </span>
      ))}
    </div>
  );
}

function InstallButton({ name }: { name: string }) {
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
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    {platforms.map(p => (
                      <option key={p.id} value={p.flag}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={(e) => executeCopy(e)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#856FE6] hover:bg-[#856FE6]/90 text-white rounded-lg text-[14px] font-medium transition-colors shrink-0 shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
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

function StarIcon() {
  return (
    <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor" className="text-black/40 group-hover:text-[#856FE6] transition-colors">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.312a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.311L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.23 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.23a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor" className="text-black/40 group-hover:text-[#856FE6] transition-colors">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
    </svg>
  );
}

export function BentoGrid({ repos }: BentoGridProps) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const [modalTarget, setModalTarget] = useState("opencode");

  useEffect(() => {
    if (!selectedRepo) {
      setReadme("");
      return;
    }

    const fetchReadme = async () => {
      setIsLoadingReadme(true);
      try {
        let res = await fetch(`https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${selectedRepo.name}/README.md`);
        if (!res.ok) {
          res = await fetch(`https://raw.githubusercontent.com/Varnan-Tech/opendirectory/master/skills/${selectedRepo.name}/README.md`);
        }
        
        if (res.ok) {
          const text = await res.text();
          setReadme(text);
        } else {
          setReadme("Failed to load README.");
        }
      } catch {
        setReadme("Failed to load README.");
      } finally {
        setIsLoadingReadme(false);
      }
    };

    fetchReadme();
  }, [selectedRepo]);

  const handleCopyPrompt = (e: React.MouseEvent, repoName: string, target: string = "opencode") => {
    e.stopPropagation();
    let command = `npx "@opendirectory.dev/skills" install ${repoName} --target ${target}`;
    if (target === "claude") {
      command = `/plugin install ${repoName}@opendirectory-marketplace`;
    }
    navigator.clipboard.writeText(command);
    toast.success("Copied install command to clipboard!");
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
          <h3 className="text-[15px] font-medium tracking-tight text-black">Open Source Skills</h3>
          <a href="https://github.com/orgs/Varnan-Tech/repositories" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-black/50 hover:text-black transition-colors flex items-center gap-1">
            View all <span className="opacity-50">→</span>
          </a>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          {repos && repos.map((item, i) => {
            const p = genRandomPattern(item.name, 3);
            return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              onClick={() => setSelectedRepo(item)}
              className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white border border-black/[0.08] rounded-xl hover:border-[#856FE6]/40 hover:shadow-[0_0_15px_rgba(133,111,230,0.1)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="hidden md:flex mt-1 text-black/30 font-mono text-[12px] min-w-[24px]">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <BrandIcon name={item.name} />
                    <h4 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://github.com/Varnan-Tech/opendirectory/tree/main/skills/${item.name}`, '_blank');
                      }}
                      className="text-[15px] font-mono font-semibold text-black/80 group-hover:text-[#856FE6] tracking-tight transition-colors break-all"
                    >
                      {item.name}
                    </h4>
                    <span className="hidden sm:inline-block text-[12px] text-black/40 font-mono">
                      Varnan-Tech/skills
                    </span>
                    <CategoryTags name={item.name} description={item.description} />
                  </div>
                  <p className="text-[13px] text-black/60 leading-relaxed font-normal truncate max-w-full">
                    {item.description || "Open source agent skill pipeline and automation logic."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-4 md:mt-0 pl-[40px] md:pl-4">
                <div className="flex items-center gap-4 text-[12px] font-medium text-black/40">
                  {item.stars > 0 || item.forks > 0 ? (
                    <>
                      <div className="flex items-center gap-1 group-hover:text-[#856FE6] transition-colors">
                        <StarIcon />
                        <span>{item.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-[#856FE6] transition-colors">
                        <ForkIcon />
                        <span>{item.forks}</span>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="relative z-20">
                  <InstallButton name={item.name} />
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>

      <AnimatePresence>
        {selectedRepo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRepo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-black/[0.08]">
                <div className="flex items-center gap-3">
                  <BrandIcon name={selectedRepo.name} />
                  <a 
                    href={`https://github.com/Varnan-Tech/opendirectory/tree/main/skills/${selectedRepo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold hover:text-[#856FE6] transition-colors break-all"
                  >
                    {selectedRepo.name}
                  </a>
                </div>
                <button
                  onClick={() => setSelectedRepo(null)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="mb-8 p-4 bg-black/[0.02] border border-black/[0.08] rounded-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                    <h4 className="text-[13px] font-semibold text-black/70 uppercase tracking-wider">Install Command</h4>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={modalTarget}
                        onChange={(e) => setModalTarget(e.target.value)}
                        className="text-[13px] font-medium bg-white border border-black/10 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#856FE6]/30 text-black/80 hover:bg-black/[0.02] transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <option value="opencode">OpenCode</option>
                        <option value="claude">Claude Code</option>
                        <option value="openclaw">OpenClaw</option>
                        <option value="hermes">Hermes Agent</option>
                        <option value="antigravity">Anti-Gravity</option>
                        <option value="gemini">Gemini CLI</option>
                      </select>
                      <button
                        onClick={(e) => handleCopyPrompt(e, selectedRepo.name, modalTarget)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-black/60 hover:text-[#856FE6] hover:bg-[#856FE6]/10 rounded-md transition-colors shrink-0 border border-transparent hover:border-[#856FE6]/20"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedPrompt ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="bg-black text-white p-4 rounded-xl font-mono text-[13px] leading-relaxed overflow-x-auto shadow-inner select-all relative group/code whitespace-pre-wrap break-all">
                    {modalTarget === "claude" ? `/plugin install ${selectedRepo.name}@opendirectory-marketplace` : `npx "@opendirectory.dev/skills" install ${selectedRepo.name} --target ${modalTarget}`}
                    <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleCopyPrompt(e, selectedRepo.name, modalTarget)}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="prose prose-sm md:prose-base max-w-none">
                  {isLoadingReadme ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-6 h-6 border-2 border-[#856FE6] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="prose prose-sm md:prose-base max-w-none text-black prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-black/10 prose-pre:m-0 prose-pre:p-4 prose-pre:rounded-xl prose-code:bg-transparent prose-code:px-0 prose-code:text-[#c9d1d9] prose-headings:text-black prose-a:text-[#856FE6] prose-strong:text-black prose-img:inline-block prose-img:m-1">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                          img: ({ node, src, alt, ...props }: any) => {
                            let finalSrc = src;
                            if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                              const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
                              finalSrc = `https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${selectedRepo.name}/${cleanSrc}`;
                            }
                            return <img src={finalSrc} alt={alt || ""} className="max-w-full rounded-lg my-4" {...props} />;
                          },
                          video: ({ ...props }) => <video {...props} className="max-w-full rounded-lg" controls />
                        }}
                      >
                        {readme}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(seedStr: string, length?: number): number[][] {
  length = length ?? 5;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = Math.imul(31, hash) + seedStr.charCodeAt(i) | 0;
  }
  
  return Array.from({ length }, (_, i) => [
    Math.abs((hash ^ (i * 137)) % 4) + 7,
    Math.abs((hash ^ (i * 251)) % 6) + 1,
  ]);
}