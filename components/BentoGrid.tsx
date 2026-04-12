"use client";

import React, { useState, useEffect } from "react";
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
  X
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
  
  if (lowerName.includes("reddit")) {
    return (
      <svg viewBox="0 0 216 216" className="w-5 h-5">
        <path fill="#ff4500" d="M108 0C48.35 0 0 48.35 0 108c0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57C6.98 209.02 9.87 216 15.64 216H108c59.65 0 108-48.35 108-108S167.65 0 108 0Z"/><circle cx="108" cy="128" r="72" fill="#fff"/>
      </svg>
    );
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
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`Agent: clone this repo https://github.com/Varnan-Tech/${name} and read the whole README.md file in that repository to understand how to use it. If there is anything you need, like an environment variable or any dependencies, ask your human agent for it.`);
    toast.success("Copied prompt to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute bottom-6 right-6 p-1.5 rounded-md bg-black/5 hover:bg-[#856FE6]/10 text-black/40 hover:text-[#856FE6] border border-black/5 hover:border-[#856FE6]/30 transition-all z-20 group/btn"
      title="Copy agent prompt"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Check className="w-3.5 h-3.5 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Copy className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {copied ? "Copied!" : "Copy prompt"}
      </div>
    </button>
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

  useEffect(() => {
    if (!selectedRepo) {
      setReadme("");
      return;
    }

    const fetchReadme = async () => {
      setIsLoadingReadme(true);
      try {
        let res = await fetch(`https://raw.githubusercontent.com/Varnan-Tech/${selectedRepo.name}/main/README.md`);
        if (!res.ok) {
          res = await fetch(`https://raw.githubusercontent.com/Varnan-Tech/${selectedRepo.name}/master/README.md`);
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

  const handleCopyPrompt = (e: React.MouseEvent, repoName: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`Agent: clone this repo https://github.com/Varnan-Tech/${repoName} and read the whole README.md file in that repository to understand how to use it. If there is anything you need, like an environment variable or any dependencies, ask your human agent for it.`);
    toast.success("Copied prompt to clipboard!");
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {repos && repos.map((item, i) => {
            const p = genRandomPattern(item.name, 3);
            return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedRepo(item)}
              className="group relative flex flex-col p-6 bg-white hover:bg-white border border-black/[0.08] rounded-xl hover:border-[#856FE6]/40 hover:shadow-[0_0_15px_rgba(133,111,230,0.15)] transition-all duration-300 cursor-pointer min-h-[160px] overflow-hidden"
            >
              <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] group-hover:opacity-100 transition-opacity duration-500 opacity-50 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/[0.02] to-black/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                  <GridPattern
                    width={20}
                    height={20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay fill-[#856FE6]/5 stroke-black/5 group-hover:fill-[#856FE6]/10 transition-colors"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-[#856FE6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <BrandIcon name={item.name} />
                <h4 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://github.com/Varnan-Tech/${item.name}`, '_blank');
                  }}
                  className="text-[15px] font-mono font-semibold text-black/80 group-hover:text-[#856FE6] tracking-tight transition-colors break-all"
                >
                  {item.name}
                </h4>
                <CategoryTags name={item.name} description={item.description} />
              </div>
              
              <p className="text-[13px] text-black/70 leading-relaxed font-normal mb-6 flex-1 relative z-10 max-w-[85%] pr-8">
                {item.description || "Open source agent skill pipeline and automation logic."}
              </p>
              
              <div className="flex items-center gap-5 text-[12px] font-medium text-black/50 relative z-10">
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

              <InstallButton name={item.name} />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/[0.08]">
                <div className="flex items-center gap-3">
                  <BrandIcon name={selectedRepo.name} />
                  <a 
                    href={`https://github.com/Varnan-Tech/${selectedRepo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold hover:text-[#856FE6] transition-colors"
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

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-8 p-4 bg-black/[0.02] border border-black/[0.08] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-black/70">Prompt Preview</h4>
                    <button
                      onClick={(e) => handleCopyPrompt(e, selectedRepo.name)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-black/60 hover:text-[#856FE6] hover:bg-[#856FE6]/10 rounded-md transition-colors"
                    >
                      {copiedPrompt ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedPrompt ? "Copied!" : "Copy Prompt"}
                    </button>
                  </div>
                  <p className="text-sm text-black/60 font-mono leading-relaxed">
                    Agent: clone this repo https://github.com/Varnan-Tech/{selectedRepo.name} and read the whole README.md file in that repository to understand how to use it. If there is anything you need, like an environment variable or any dependencies, ask your human agent for it.
                  </p>
                </div>

                <div className="prose prose-sm md:prose-base max-w-none">
                  {isLoadingReadme ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-6 h-6 border-2 border-[#856FE6] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      className="prose prose-sm md:prose-base max-w-none text-black"
                      components={{
                        img: ({ ...props }) => <img {...props} alt={props.alt || ""} className="max-w-full rounded-lg" />,
                        video: ({ ...props }) => <video {...props} className="max-w-full rounded-lg" controls />
                      }}
                    >
                      {readme}
                    </ReactMarkdown>
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