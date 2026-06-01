import React from 'react';

export function DocsAnimation() {
  return (
    <div className="w-full h-64 md:h-80 overflow-hidden relative flex items-center justify-center mb-12">
      <svg viewBox="0 0 800 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#856FE6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#856FE6" stopOpacity="1" />
            <stop offset="100%" stopColor="#856FE6" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#856FE6" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#856FE6" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Pipeline Base */}
        <path d="M 150 150 L 650 150" fill="none" stroke="url(#pipeline-grad)" strokeWidth="6" opacity="0.5" filter="url(#glow)" />
        <path d="M 150 150 L 650 150" fill="none" stroke="#856FE6" strokeWidth="2" strokeDasharray="10 10">
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        
        {/* Outer Pipeline Bounds */}
        <path d="M 150 130 L 650 130" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.4" />
        <path d="M 150 170 L 650 170" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.4" />

        {/* Data Packets */}
        <g>
          <circle cx="0" cy="150" r="5" fill="#856FE6" filter="url(#glow)">
            <animate attributeName="cx" values="150; 650" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.8; 1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="150" r="4" fill="#856FE6" filter="url(#glow)">
            <animate attributeName="cx" values="150; 650" dur="2s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.8; 1" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="150" r="6" fill="#856FE6" filter="url(#glow)">
            <animate attributeName="cx" values="150; 650" dur="2s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.8; 1" dur="2s" begin="1.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Source Node (Package) */}
        <g transform="translate(150, 150)">
          <rect x="-40" y="-40" width="80" height="80" rx="20" fill="white" stroke="#856FE6" strokeWidth="2" filter="url(#shadow)" />
          <rect x="-30" y="-30" width="60" height="60" rx="12" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.5" />
          
          {/* Package Icon */}
          <path d="M -15 -10 L 0 -20 L 15 -10 L 15 10 L 0 20 L -15 10 Z" fill="none" stroke="#856FE6" strokeWidth="2" strokeLinejoin="round" />
          <path d="M -15 -10 L 0 0 L 15 -10 M 0 0 L 0 20" fill="none" stroke="#856FE6" strokeWidth="2" strokeLinejoin="round" />
          
          <circle cx="0" cy="0" r="54" fill="none" stroke="#856FE6" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Destination Node (AI Agent Core) */}
        <g transform="translate(650, 150)">
          {/* Outer Rings */}
          <circle cx="0" cy="0" r="65" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="80" fill="none" stroke="#856FE6" strokeWidth="1.5" strokeDasharray="30 10" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="95" fill="none" stroke="#856FE6" strokeWidth="1" strokeDasharray="4 12" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
          </circle>
          
          {/* Core Hexagon */}
          <polygon points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5" fill="white" stroke="#856FE6" strokeWidth="3" filter="url(#shadow)" />
          <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.3" />
          
          {/* Inner Eye/Core */}
          <circle cx="0" cy="0" r="18" fill="url(#core-grad)" filter="url(#glow-strong)">
            <animate attributeName="r" values="15; 22; 15" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8; 1; 0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="8" fill="white" />
          
          {/* Connecting lines to core */}
          <path d="M 0 -45 L 0 -25 M 39 -22.5 L 22 -12.5 M 39 22.5 L 22 12.5 M 0 45 L 0 25 M -39 22.5 L -22 12.5 M -39 -22.5 L -22 -12.5" stroke="#856FE6" strokeWidth="2" opacity="0.5" />
        </g>

        {/* Floating Particles */}
        <g fill="#856FE6" opacity="0.6">
          <circle cx="300" cy="80" r="2.5">
            <animate attributeName="cy" values="80; 60; 80" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="220" r="3.5">
            <animate attributeName="cy" values="220; 240; 220" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1; 0.6; 0.1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="100" r="2">
            <animate attributeName="cy" values="100; 80; 100" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3; 0.9; 0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="200" r="3">
            <animate attributeName="cy" values="200; 220; 200" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2; 0.7; 0.2" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
