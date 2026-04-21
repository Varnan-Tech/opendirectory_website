"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedHero() {
  const text1 = "THE GTM SKILLS";
  const text2 = "FOR YOUR AGENT.";
  
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <div className="relative w-full flex flex-col items-center lg:items-start text-center lg:text-left">
      <motion.h1 
        variants={container}
        initial="hidden"
        animate="visible"
        className="font-display font-bold text-5xl md:text-6xl tracking-tighter uppercase text-[#1e293b] leading-[0.92]"
      >
        <div className="block">
          {text1.split("").map((char, index) => (
            <motion.span key={`t1-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
        </div>
        <div className="block">
          {text2.split("").map((char, index) => (
            <motion.span key={`t2-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
        </div>
      </motion.h1>
    </div>
  );
}
