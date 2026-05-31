"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: true,
  loading: () => <div className="w-full h-32 bg-black/5 animate-pulse rounded-xl"></div>
});
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
  Package,
  Download,
  Sparkles
} from "lucide-react";
import { InstallButton, DownloadButton, ManusButton } from "@/components/SkillActions";

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
  selectedRepo: GitHubRepo | null;
  onSelect: (repo: GitHubRepo) => void;
  onClose: () => void;
}

export function BrandIcon({ name }: { name: string }) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("google") || lowerName.includes("trends")) {
    return <img src="/vectors/google-icon.svg" alt="Google" className="w-5 h-5" />;
  }
  
  if (lowerName.includes("yc") || lowerName.includes("ycombinator")) {
    return (
      <div className="w-5 h-5 bg-[#FF6600] flex items-center justify-center rounded-sm">
        <span className="text-white font-bold text-[10px]">Y</span>
      </div>
    );
  }
  
  if (lowerName.includes("twitter") || lowerName.includes("x-")) {
    return <img src="/vectors/twitter-icon.svg" alt="Twitter" className="w-5 h-5" />;
  }

  if (lowerName.includes("github") || lowerName.includes("code")) {
    return <img src="/vectors/github-icon.svg" alt="GitHub" className="w-5 h-5" />;
  }
  
  if (lowerName.includes("producthunt") || lowerName.includes("product-hunt")) {
    return <img src="/vectors/producthunt-icon.svg" alt="ProductHunt" className="w-5 h-5" />;
  }

  if (lowerName.includes("meta") || lowerName.includes("facebook") || lowerName.includes("ads")) {
    return <img src="/vectors/meta-icon.svg" alt="Meta" className="w-5 h-5" />;
  }

  if (lowerName.includes("reddit")) {
    return <img src="/vectors/reddit-icon.svg" alt="Reddit" className="w-5 h-5" />;
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

function StarIcon() {
  return (
    <img src="/vectors/star-icon.svg" alt="Star" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:invert-[.4] group-hover:sepia-[.8] group-hover:saturate-[4] group-hover:hue-rotate-[220deg] transition-all" />
  );
}

function ForkIcon() {
  return (
    <img src="/vectors/fork-icon.svg" alt="Fork" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:invert-[.4] group-hover:sepia-[.8] group-hover:saturate-[4] group-hover:hue-rotate-[220deg] transition-all" />
  );
}

export function BentoGrid({ repos, selectedRepo, onSelect, onClose }: BentoGridProps) {
  const [readme, setReadme] = useState<string>("");
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const [modalTarget, setModalTarget] = useState("opencode");
  const [installMethod, setInstallMethod] = useState<"cli" | "download" | "manus">("cli");

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
              onClick={() => onSelect(item)}
              className="group relative flex flex-col p-4 bg-white border border-black/[0.08] rounded-xl hover:border-[#856FE6]/40 hover:shadow-[0_0_15px_rgba(133,111,230,0.1)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-start gap-4 w-full">
                    <div className="hidden md:flex mt-1 text-black/30 font-mono text-[12px] min-w-[24px]">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start md:items-center justify-between mb-1.5 w-full gap-2">
                        <div className="flex items-center gap-3">
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
                          <span className="hidden sm:inline-block text-[12px] text-black/40 font-mono shrink-0">
                            Varnan-Tech/skills
                          </span>
                        </div>
                        <div className="shrink-0 hidden md:block">
                          <CategoryTags name={item.name} description={item.description} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1 mb-3 md:hidden">
                        <CategoryTags name={item.name} description={item.description} />
                      </div>
                      
                      <p className="text-[13px] text-black/60 leading-relaxed font-normal truncate max-w-full">
                        {item.description || "Open source agent skill pipeline and automation logic."}
                      </p>
                      
                      <div className="flex md:hidden items-center justify-end w-full relative z-20 mt-3 pt-3 border-t border-black/[0.04] gap-2">
                        <DownloadButton name={item.name} />
                        <ManusButton name={item.name} />
                        <InstallButton name={item.name} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-between w-full relative z-20 pl-[40px] mt-1">
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
                    <div className="ml-auto flex items-center gap-2">
                      <DownloadButton name={item.name} />
                      <ManusButton name={item.name} />
                      <InstallButton name={item.name} />
                    </div>
                  </div>
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
            onClick={() => onClose()}
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
                  onClick={() => onClose()}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5 text-black/50" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="mb-8 p-4 bg-black/[0.02] border border-black/[0.08] rounded-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <h4 className="text-[13px] font-semibold text-black/70 uppercase tracking-wider">Install</h4>
                    <div className="inline-flex items-center gap-1 p-1 bg-black/[0.04] border border-black/[0.06] rounded-lg">
                      {[
                        { id: "cli", label: "CLI Command", icon: <Copy className="w-3.5 h-3.5" /> },
                        { id: "download", label: "Download", icon: <Download className="w-3.5 h-3.5" /> },
                        { id: "manus", label: "Manus AI", icon: <Sparkles className="w-3.5 h-3.5" /> },
                      ].map((tab) => {
                        const active = installMethod === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setInstallMethod(tab.id as "cli" | "download" | "manus")}
                            className={
                              "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-all " +
                              (active
                                ? "bg-white text-black shadow-sm border border-black/[0.06]"
                                : "text-black/55 hover:text-black/80 border border-transparent")
                            }
                          >
                            {tab.icon}
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {installMethod === "cli" && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <select
                          value={modalTarget}
                          onChange={(e) => setModalTarget(e.target.value)}
                          className="text-[13px] font-medium bg-white border border-black/10 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#856FE6]/30 text-black/80 hover:bg-black/[0.02] transition-colors cursor-pointer"
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
                      <div className="bg-black text-white p-4 rounded-xl font-mono text-[13px] leading-relaxed overflow-x-auto shadow-inner select-all relative group/code whitespace-pre-wrap break-all">
                        {modalTarget === "claude" ? `/plugin install ${selectedRepo.name}@opendirectory-marketplace` : `npx "@opendirectory.dev/skills" install ${selectedRepo.name} --target ${modalTarget}`}
                      </div>
                    </div>
                  )}

                  {installMethod === "download" && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-[13px] text-black/60 leading-relaxed">
                        Get this skill as a portable <code className="font-mono text-[12px] bg-black/[0.05] px-1.5 py-0.5 rounded">.skill.zip</code>. Drop it into Claude desktop, Manus, or any agent that accepts skill folders.
                      </p>
                      <a
                        href={`/api/download/${encodeURIComponent(selectedRepo.name)}`}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-[13px] font-medium hover:bg-black/80 transition-colors shrink-0 self-start sm:self-auto"
                      >
                        <Download className="w-4 h-4" />
                        Download .skill.zip
                      </a>
                    </div>
                  )}

                  {installMethod === "manus" && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-[13px] text-black/60 leading-relaxed">
                        One-click import into your <strong className="text-black">Manus AI</strong> workspace. Opens manus.im and pulls the skill from GitHub.
                      </p>
                      <a
                        href={`https://manus.im/import-skills?githubUrl=${encodeURIComponent(`https://github.com/Varnan-Tech/opendirectory/tree/main/skills/${selectedRepo.name}`)}&utm_source=opendirectory`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#856FE6] hover:bg-[#856FE6]/90 text-white rounded-lg text-[13px] font-medium transition-colors shrink-0 self-start sm:self-auto"
                      >
                        <Sparkles className="w-4 h-4" />
                        Open in Manus AI
                      </a>
                    </div>
                  )}
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
                          p: ({ node, children, ...props }: any) => {
                            const childrenArray = React.Children.toArray(children);
                            if (
                              childrenArray.length === 1 && 
                              typeof childrenArray[0] === 'string' && 
                              childrenArray[0].includes("github.com/user-attachments/assets/")
                            ) {
                              const href = childrenArray[0];
                              return (
                                <span className="block my-4">
                                  <video 
                                    src="/tutorial.webm" 
                                    controls 
                                    playsInline
                                    preload="metadata"
                                    className="max-w-full w-full rounded-lg shadow-sm border border-black/10 block bg-black"
                                  >
                                    <source src="/tutorial.webm" type="video/webm" />
                                    Your browser does not support the video tag.
                                  </video>
                                </span>
                              );
                            }
                            
                            return <p {...props}>{children}</p>;
                          },
                          a: ({ node, href, children, ...props }: any) => {
                            const isVideoUrl = href && (
                              href.includes("github.com/user-attachments/assets/") || 
                              href.endsWith(".mp4") || 
                              href.endsWith(".webm") || 
                              href.endsWith(".ogg")
                            );
                            
                            if (isVideoUrl) {
                              const childrenArray = React.Children.toArray(children);
                              const textContent = childrenArray.length > 0 ? childrenArray[0] : '';
                              const isTextMatch = typeof textContent === 'string' && textContent === href;
                              
                              return (
                                <span className="block my-4">
                                  {!isTextMatch && childrenArray.length > 0 && (
                                    <span className="block mb-2 text-[14px] font-medium text-black/80">{children}</span>
                                  )}
                                  <video 
                                    src="/tutorial.webm" 
                                    controls 
                                    playsInline
                                    preload="metadata"
                                    className="max-w-full w-full rounded-lg shadow-sm border border-black/10 block bg-black"
                                  >
                                    <source src="/tutorial.webm" type="video/webm" />
                                    Your browser does not support the video tag.
                                  </video>
                                </span>
                              );
                            }
                            
                            return (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#856FE6] hover:underline break-all" {...props}>
                                {children}
                              </a>
                            );
                          },
                          img: ({ node, src, alt, ...props }: any) => {
                            let finalSrc = src;
                            if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                              const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
                              finalSrc = `https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${selectedRepo.name}/${cleanSrc}`;
                            }
                            return <img src={finalSrc} alt={alt || ""} className="max-w-full rounded-lg my-4" {...props} />;
                          },
                          video: ({ node, src, ...props }: any) => {
                            let finalSrc = src;
                            if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                              const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
                              finalSrc = `https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${selectedRepo.name}/${cleanSrc}`;
                            }
                            return <video src={finalSrc} {...props} className="max-w-full rounded-lg" controls />;
                          },
                          source: ({ node, src, ...props }: any) => {
                            let finalSrc = src;
                            if (src && !src.startsWith("http") && !src.startsWith("data:")) {
                              const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
                              finalSrc = `https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${selectedRepo.name}/${cleanSrc}`;
                            }
                            return <source src={finalSrc} {...props} />;
                          }
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