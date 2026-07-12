import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatedHero } from "@/components/AnimatedHero";
import { InstallCommand } from "@/components/InstallCommand";
import { Button } from "@/components/ui/neon-button";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { HeroVideo } from "@/components/HeroVideo";
import { GitHubStarButton } from "@/components/GitHubStarButton";
import { Spotlight } from "@/components/core/spotlight";
import { GithubCopilot, Codex, Claude, GeminiCLI, Antigravity } from '@lobehub/icons';

const FilterableSkills = dynamic(() => import("@/components/FilterableSkills").then(mod => mod.FilterableSkills), {
  ssr: true,
  loading: () => <div className="w-full h-64 bg-black/5 animate-pulse rounded-xl"></div>
});

const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer), {
  ssr: true,
  loading: () => <div className="w-full h-32 bg-black/5 animate-pulse"></div>
});

const LogoCloud = dynamic(() => import("@/components/ui/logo-cloud-3").then(mod => mod.LogoCloud), {
  ssr: true,
  loading: () => <div className="w-full h-16 bg-black/5 animate-pulse rounded-xl"></div>
});

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  topics?: string[];
}

function getLanguageColor(language: string) {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Vue: "#41b883",
    Go: "#00ADD8",
    "Jupyter Notebook": "#DA5B0B",
    Shell: "#89e051",
    Ruby: "#701516",
    Rust: "#dea584",
  };
  return colors[language] || "#ededed";
}

function formatDistanceToNow(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days`;
  return `${Math.floor(diffInSeconds / 2592000)} months`;
}

async function fetchWithTimeout(url: string, options: any = {}, timeout = 5000) {
  const maxRetries = 3;
  
  const headers = new Headers(options.headers || {});
  if (process.env.GITHUB_TOKEN) {
    headers.set('Authorization', `token ${process.env.GITHUB_TOKEN}`);
  }
  
  const fetchOptions = { ...options, headers };

  for (let i = 0; i <= maxRetries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(id);
      
      if ((response.status === 403 || response.status === 429) && i < maxRetries) {
        throw new Error(`Rate limited: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(id);
      if (i === maxRetries) {
        throw error;
      }
      const delay = 1000 * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Fetch failed after retries");
}

async function chunkedPromiseAll<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  chunkSize: number
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(fn));
    results.push(...chunkResults);
  }
  return results;
}

async function getGitHubStats(): Promise<GitHubRepo[]> {
  try {
    // We now fetch the contents of the "skills" folder from the opendirectory repo
    const res = await fetch("https://api.github.com/repos/Varnan-Tech/opendirectory/contents/skills", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const skillsFolders = await res.json();
    
    // We need to fetch details for each skill (from package.json and GitHub repo stats if exists)
    // Since skills are folders, we can use their names and fetch package.json to get description
    const processedRepos = await chunkedPromiseAll(skillsFolders, async (folder: any) => {
      if (folder.type !== "dir") return null;
      
      const skillName = folder.name;
      let description = "Open source agent skill pipeline and automation logic.";
      let topics: string[] = [];
      let stars = 0;
      let forks = 0;
      let language = "TypeScript";
      let updatedAt = new Date().toISOString();
      
      try {
        // Try to fetch package.json for description
        const pkgRes = await fetchWithTimeout(`https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${skillName}/package.json`, {
          next: { revalidate: 3600 }
        });
        
        let pkgData = null;
        if (pkgRes.ok) {
          try {
            pkgData = await pkgRes.json();
          } catch (e) {
            console.error(`Error parsing package.json for ${skillName}:`, e);
          }
        }

        if (pkgData) {
          if (pkgData.description) description = pkgData.description;
          if (pkgData.keywords) topics = pkgData.keywords;
        } else {
           // Fallback to README
           const readmeRes = await fetchWithTimeout(`https://raw.githubusercontent.com/Varnan-Tech/opendirectory/main/skills/${skillName}/README.md`, {
             next: { revalidate: 3600 }
           });
           if (readmeRes.ok) {
             const readmeText = await readmeRes.text();
              const lines = readmeText.split('\n');
              let inCodeBlock = false;
              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith('```')) {
                  inCodeBlock = !inCodeBlock;
                  continue;
                }
                if (inCodeBlock) continue;
                if (trimmed.toLowerCase().startsWith('## install')) break;
                if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('<') && !trimmed.startsWith('![')) {
                  description = trimmed;
                  break;
                }
              }
           }
        }
      } catch (e: any) {
        console.error(`Error fetching details for ${skillName}: ${e.message || "Request failed"}`);
      }

      return {
        name: skillName,
        description,
        language,
        languageColor: getLanguageColor(language),
        stars,
        forks,
        updatedAt: "recently", // Simplified for directory-based skills
        topics
      };
    }, 5);

    return processedRepos.filter(Boolean) as GitHubRepo[];
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return [];
  }
}

export default async function Home() {
  const repos = await getGitHubStats();
  const repoNames = repos.map((r: GitHubRepo) => r.name);
  
  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black overflow-x-hidden selection:bg-black selection:text-white">
      <div className="w-full bg-[#856FE6] py-2.5 px-4 text-center z-50 relative">
        <Link 
          href="https://github.com/Varnan-Tech/opendirectory/blob/main/CONTRIBUTING.md" 
          className="text-white text-xs md:text-sm font-medium hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-1"
        >
          Contribute to our repository and get a chance to <strong className="font-bold underline decoration-[#856FE6] decoration-2 underline-offset-2">win our merch!</strong> →
        </Link>
      </div>
      <div className="bg-noise" />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center z-30 relative">
        <div className="flex items-center gap-3">
          <AnimatedLogo />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/docs" className="text-sm font-medium hover:text-[#856FE6] transition-colors underline decoration-[#856FE6] underline-offset-4">Docs</Link>
        </div>

        <div className="flex items-center gap-4">
          <GitHubStarButton repos={repoNames} />
        </div>
      </header>
      
      <section className="relative w-full z-10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-net pointer-events-none z-0" />

        <div className="w-full max-w-[1300px] mx-auto px-6 py-4 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 lg:flex-[0.45] flex flex-col items-center lg:items-start text-center lg:text-left gap-6 min-w-0">
              <div className="flex flex-col items-center lg:items-start gap-2 lg:gap-4">
                <AnimatedHero />

                <p className="text-base md:text-lg text-black/60 max-w-lg leading-relaxed text-balance font-normal">
                  The unified home for open-source agent skills built for founders who hate marketing.
                </p>
              </div>
              <InstallCommand />
            </div>

            <div className="flex-1 lg:flex-[0.55] w-full">
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[450px] overflow-hidden rounded-[28px]">
                  <HeroVideo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-5xl py-12 z-20 flex flex-col md:flex-row items-center gap-8 px-6">
        <h2 className="whitespace-nowrap font-medium text-black/60 text-xl tracking-tight">
          Works everywhere you do
        </h2>
        <div className="w-full flex-1 overflow-hidden">
          <LogoCloud logos={logos} />
        </div>
      </section>

      <section id="skills" className="w-full max-w-[1200px] mx-auto px-6 py-32 z-30 relative bg-[#FAFAFA] rounded-[40px] mb-24">
        <div className="flex flex-col gap-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mb-4 text-black">
              Popular Agent Skills
            </h2>
            <p className="text-black/50 text-[15px] leading-relaxed max-w-lg">
              A collection of high-performance agent skills and CLI utilities to help you build autonomous workflows with precision.
            </p>
          </div>
          
          <FilterableSkills initialRepos={repos as GitHubRepo[]} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

const logos = [
  {
    alt: "OpenClaw Logo",
    component: (
      <div className="flex items-center gap-2 select-none h-6 md:h-8 scale-[1.3] md:scale-[1.35] origin-center shrink-0 mx-6 md:mx-10">
        <svg
          viewBox="0 -12 120 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 md:h-8 w-6 md:w-8 select-none shrink-0 overflow-visible"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lobster-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d"/>
              <stop offset="100%" stopColor="#991b1b"/>
            </linearGradient>
          </defs>
          <g>
            {/* Body */}
            <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#lobster-gradient)"/>
            {/* Left Claw (hinges on its body-facing edge) */}
            <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#lobster-gradient)">
              <animateTransform attributeName="transform" type="rotate"
                values="0 26 53; 0 26 53; -8 26 53; 0 26 53; 0 26 53" keyTimes="0; 0.85; 0.9; 0.95; 1"
                dur="4s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"/>
            </path>
            {/* Right Claw (snaps 0.2s after the left) */}
            <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#lobster-gradient)">
              <animateTransform attributeName="transform" type="rotate"
                values="0 94 53; 0 94 53; -8 94 53; 0 94 53; 0 94 53" keyTimes="0; 0.85; 0.9; 0.95; 1"
                dur="4s" begin="0.2s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"/>
            </path>
            {/* Antenna */}
            <path d="M45 15 Q35 5 30 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate"
                values="0 37.5 11; -3 37.5 11; 3 37.5 11; 0 37.5 11" keyTimes="0; 0.25; 0.75; 1"
                dur="2s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"/>
            </path>
            <path d="M75 15 Q85 5 90 8" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate"
                values="0 82.5 11; -3 82.5 11; 3 82.5 11; 0 82.5 11" keyTimes="0; 0.25; 0.75; 1"
                dur="2s" repeatCount="indefinite"
                calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"/>
            </path>
            {/* Eyes */}
            <circle cx="45" cy="35" r="6" fill="#050810"/>
            <circle cx="75" cy="35" r="6" fill="#050810"/>
            <circle cx="46" cy="34" r="2.5" fill="#00e5cc">
              <animate attributeName="opacity" values="1; 1; 0.3; 1" keyTimes="0; 0.9; 0.95; 1" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="76" cy="34" r="2.5" fill="#00e5cc">
              <animate attributeName="opacity" values="1; 1; 0.3; 1" keyTimes="0; 0.9; 0.95; 1" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
        <span className="font-bold text-[15px] md:text-[20px] text-black tracking-tighter leading-none shrink-0">
          OpenClaw
        </span>
      </div>
    ),
  },
  {
    alt: "Hermes Agent Logo",
    src: "/hermes-agent-logo.webp",
  },
  {
    alt: "Claude Code Logo",
    component: <Claude.Combine size={32} type={'color'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="text-black" />,
  },
  {
    alt: "Codex Logo",
    component: <Codex.Combine size={32} type={'color'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="text-black" />,
  },
  {
    alt: "Opencode Logo",
    src: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/icons/opencode-text.svg",
  },
  {
    alt: "Antigravity Logo",
    component: <Antigravity.Combine size={32} type={'color'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="text-black" />,
  },
  {
    alt: "GitHub Copilot Logo",
    component: <GithubCopilot.Combine size={32} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="text-black" />,
  },
  {
    alt: "Gemini CLI Logo",
    component: <GeminiCLI.Combine size={32} type={'color'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="text-black" />,
  },
];
