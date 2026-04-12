import React from "react";
import Link from "next/link";
import { AnimatedHero } from "@/components/AnimatedHero";
import { FilterableSkills } from "@/components/FilterableSkills";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/neon-button";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { GitHubStarButton } from "@/components/GitHubStarButton";
import { Spotlight } from "@/components/core/spotlight";
import { GithubCopilot, Codex, Claude, GeminiCLI, Antigravity } from '@lobehub/icons';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
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

async function getGitHubStats(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch("https://api.github.com/orgs/Varnan-Tech/repos?type=public&per_page=100", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const allRepos = await res.json();
    
    const filteredRepos = allRepos.filter((repo: any) => 
      !repo.fork && 
      !repo.archived && 
      (repo.topics?.some((t: string) => t.includes('skill') || t.includes('scraper')) || 
       repo.name.toLowerCase().includes('skill') || 
       repo.name.toLowerCase().includes('scraper'))
    );

    return filteredRepos.map((data: any) => ({
      name: data.name,
      description: data.description,
      language: data.language || "Unknown",
      languageColor: getLanguageColor(data.language || "Unknown"),
      stars: data.stargazers_count,
      forks: data.forks_count,
      updatedAt: formatDistanceToNow(new Date(data.updated_at)) + " ago"
    }));
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
      <div className="bg-noise" />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center z-30 relative">
        <div className="flex items-center gap-3">
          <AnimatedLogo />
        </div>
        <div className="flex items-center gap-4">
          <GitHubStarButton repos={repoNames} />
        </div>
      </header>
      
      <section className="relative w-full z-10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-net pointer-events-none z-0" />

        <div className="w-full max-w-[1300px] mx-auto px-6 pt-20 pb-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 lg:flex-[0.45] flex flex-col items-start gap-6 min-w-0">
              <AnimatedHero />

              <p className="text-base md:text-lg text-black/60 max-w-lg leading-relaxed text-balance font-normal">
                The unified home for open-source agent skills and automation pipelines designed for autonomous agents.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 pt-1">
                <div className="relative overflow-hidden rounded-full p-[1px] w-full sm:w-auto bg-black/10 group">
                  <Spotlight
                    className="from-[#856FE6]/80 via-[#856FE6]/40 to-transparent blur-md"
                    size={100}
                  />
                  <div className="relative h-full w-full rounded-full bg-white">
                    <a href="#skills" className="block w-full">
                      <Button variant="solid" size="lg" className="w-full font-medium tracking-tight bg-[#856FE6] text-white hover:bg-[#856FE6]/90 border-0 relative [box-shadow:inset_0_0_0_0.5px_rgba(134,143,151,0.2),inset_1px_1px_0_-0.5px_rgba(134,143,151,0.4),inset_-1px_-1px_0_-0.5px_rgba(134,143,151,0.4)] after:absolute after:inset-0 after:rounded-full after:opacity-0 after:transition-opacity after:duration-200 after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(0,0,0)_0%,rgb(24,24,24)_100%)] after:[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border)),0_0_3px_rgba(255,255,255,0.1)] hover:after:opacity-100">
                        <span className="flex items-center justify-center gap-1.5 relative z-10">
                          Explore Directory
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" neon={true} className="w-full sm:w-auto font-medium tracking-tight border border-black/10 text-black hover:bg-black/5 bg-transparent relative [box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border))] after:absolute after:inset-0 after:rounded-full after:opacity-0 after:transition-opacity after:duration-200 after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgb(255,255,255)_0%,rgb(242,242,242)_100%)] after:[box-shadow:inset_0_0_0_0.5px_hsl(var(--border)),inset_1px_1px_0_-0.5px_hsl(var(--border)),inset_-1px_-1px_0_-0.5px_hsl(var(--border)),0_0_3px_hsl(var(--ring))] hover:after:opacity-100">
                    <span className="relative z-10">Documentation</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 lg:flex-[0.55] w-full">
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[760px] overflow-hidden rounded-[28px]">
                  <div className="aspect-[1480/1080] w-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute top-0 bottom-0 h-full w-[129.7%] -left-[14.86%] max-w-none object-fill"
                    >
                      <source src="/opendirectorydev_hero_video.webm" type="video/webm" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-5xl py-12 z-10 flex flex-col md:flex-row items-center gap-8 px-6">
        <h2 className="whitespace-nowrap font-medium text-black/60 text-xl tracking-tight">
          Works everywhere you do
        </h2>
        <div className="w-full flex-1 overflow-hidden">
          <LogoCloud logos={logos} />
        </div>
      </section>

      <section id="skills" className="w-full max-w-[1200px] mx-auto px-6 py-32 z-10 relative">
        <div className="flex flex-col gap-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter mb-4 text-black">
              Featured Agent Skills
            </h2>
            <p className="text-black/50 text-[15px] leading-relaxed max-w-lg">
              A collection of high-performance agent skills and CLI utilities to help you build autonomous workflows with precision.
            </p>
          </div>
          
          <FilterableSkills initialRepos={repos as any} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

const logos = [
  {
    alt: "OpenClaw Logo",
    src: "https://raw.githubusercontent.com/openclaw/openclaw/refs/heads/main/docs/assets/openclaw-logo-text-dark.png",
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
