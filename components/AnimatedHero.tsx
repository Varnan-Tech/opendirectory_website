"use client";

import React from "react";
import { Typewriter } from "@/components/ui/typewriter";

const WORDS = ["WORKFLOW.", "AGENT.", "PIPELINE.", "SYSTEM."];

export function AnimatedHero() {
  return (
    <div
      className="w-full flex flex-col items-start text-left text-5xl sm:text-6xl md:text-[72px] lg:text-[80px] leading-[0.92] text-black font-display font-normal"
      style={{ letterSpacing: "-0.04em" }}
    >
      <span>THE EXECUTION LAYER</span>
      <div className="relative h-[1.1em] flex items-center gap-[0.2em]">
        <span className="text-black/50">FOR YOUR</span>
        <Typewriter 
          text={WORDS}
          speed={70}
          waitTime={2000}
          deleteSpeed={40}
          loop={true}
          cursorClassName="text-[#856FE6]"
          className="text-[#856FE6]"
        />
        <span className="opacity-0 pointer-events-none select-none absolute">WORKFLOW.</span>
      </div>
    </div>
  );
}
