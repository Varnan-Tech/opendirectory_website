"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PretextHeroProps {
  text: string;
  className?: string;
}

export function PretextHero({ text, className = "" }: PretextHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-full flex flex-col items-center justify-center text-center ${className}`}>
        {text.split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    );
  }

  const lines = text.split("\n");
  let globalWordIndex = 0;

  return (
    <div className={`w-full flex flex-col items-center justify-center text-center ${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap justify-center w-full">
          {line.split(" ").map((word) => {
            const i = globalWordIndex++;
            return (
              <div 
                key={i} 
                className="overflow-hidden inline-flex mr-[0.25em] pb-[0.1em] mb-[-0.1em]"
              >
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05, 
                    ease: [0.21, 0.45, 0.32, 0.9],
                  }}
                  className="inline-block will-change-transform text-white"
                >
                  {word}
                </motion.span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
