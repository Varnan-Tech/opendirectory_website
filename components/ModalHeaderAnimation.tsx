import React from 'react';

export function ModalHeaderAnimation() {
  return (
    <div className="w-full h-24 bg-[#050505] overflow-hidden relative flex items-center justify-center border-b border-black/10">
      <svg viewBox="0 0 800 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#856FE6" stopOpacity="0" />
            <stop offset="50%" stopColor="#856FE6" stopOpacity="1" />
            <stop offset="100%" stopColor="#856FE6" stopOpacity="0" />
          </linearGradient>
          
          <filter id="modal-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Lines */}
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
          <line x1="0" y1="20" x2="800" y2="20" />
          <line x1="0" y1="40" x2="800" y2="40" />
          <line x1="0" y1="60" x2="800" y2="60" />
          <line x1="0" y1="80" x2="800" y2="80" />
          
          <line x1="200" y1="0" x2="200" y2="100" />
          <line x1="400" y1="0" x2="400" y2="100" />
          <line x1="600" y1="0" x2="600" y2="100" />
        </g>

        {/* Central Data Stream */}
        <path d="M 0 50 Q 200 30, 400 50 T 800 50" fill="none" stroke="url(#stream-grad)" strokeWidth="2" opacity="0.6">
          <animate attributeName="d" 
            values="M 0 50 Q 200 30, 400 50 T 800 50; M 0 50 Q 200 70, 400 50 T 800 50; M 0 50 Q 200 30, 400 50 T 800 50" 
            dur="4s" repeatCount="indefinite" />
        </path>
        
        <path d="M 0 50 Q 200 70, 400 50 T 800 50" fill="none" stroke="url(#stream-grad)" strokeWidth="1" opacity="0.4">
          <animate attributeName="d" 
            values="M 0 50 Q 200 70, 400 50 T 800 50; M 0 50 Q 200 30, 400 50 T 800 50; M 0 50 Q 200 70, 400 50 T 800 50" 
            dur="3s" repeatCount="indefinite" />
        </path>

        {/* Moving Packets */}
        <g filter="url(#modal-glow)">
          <rect x="-20" y="48" width="20" height="4" rx="2" fill="#fff">
            <animate attributeName="x" values="-20; 820" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="-20" y="48" width="10" height="4" rx="2" fill="#fff">
            <animate attributeName="x" values="-20; 820" dur="1.8s" begin="0.7s" repeatCount="indefinite" />
          </rect>
          <rect x="-20" y="48" width="30" height="4" rx="2" fill="#fff">
            <animate attributeName="x" values="-20; 820" dur="3s" begin="1.2s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Binary/Hex Data Text */}
        <g fill="#856FE6" opacity="0.6" fontSize="12" fontFamily="monospace" letterSpacing="2">
          <text x="100" y="30">
            010010
            <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="2s" repeatCount="indefinite" />
          </text>
          <text x="600" y="80">
            110100
            <animate attributeName="opacity" values="0.2; 0.8; 0.2" dur="3s" repeatCount="indefinite" />
          </text>
          <text x="350" y="20">
            0x8F
            <animate attributeName="opacity" values="0.2; 0.7; 0.2" dur="2.5s" repeatCount="indefinite" />
          </text>
          <text x="450" y="90">
            0x2A
            <animate attributeName="opacity" values="0.2; 0.7; 0.2" dur="1.5s" repeatCount="indefinite" />
          </text>
        </g>
      </svg>
    </div>
  );
}
