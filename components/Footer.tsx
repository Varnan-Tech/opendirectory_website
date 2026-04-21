"use client";

import React from "react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/[0.05] bg-white pt-16 pb-8 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[15px] font-medium text-black mb-4 tracking-tight">Open Directory</h4>
            <p className="text-black/50 text-[13px] max-w-sm leading-relaxed font-normal">
              The unified home for open-source GTM agent skills and automation pipelines designed for autonomous agents.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="text-[13px] font-medium text-black mb-4 tracking-tight">Resources</h4>
              <ul className="space-y-3 text-[13px] font-normal text-black/50">
                <li><a href="/docs" className="hover:text-black transition-colors">Documentation</a></li>
                <li><a href="https://github.com/Varnan-Tech/opendirectory" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[13px] font-medium text-black mb-4 tracking-tight">Legal</h4>
              <ul className="space-y-3 text-[13px] font-normal text-black/50">
                <li><a href="/privacy" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden flex justify-center items-center px-4 mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1400px] flex justify-center"
        >
          <svg viewBox="0 0 1000 180" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="footer-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="black" />
                <stop offset="70%" stopColor="rgba(0,0,0,0.7)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
              </linearGradient>
            </defs>
            <text 
              x="50%" 
              y="40%" 
              dominantBaseline="central" 
              textAnchor="middle" 
              className="font-bold tracking-tighter select-none"
              fontSize="125"
              letterSpacing="-0.04em"
              fill="url(#footer-gradient)"
            >
              OPENDIRECTORY
            </text>
          </svg>
        </motion.div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center text-[13px] font-normal text-black/40">
        <p>© {new Date().getFullYear()} Open Directory</p>
      </div>
    </footer>
  );
}
