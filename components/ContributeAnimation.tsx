import React from "react";

export function ContributeAnimation() {
  return (
    <div className="w-full max-w-[400px] aspect-square relative flex items-center justify-center mb-8">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#856FE6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#856FE6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#856FE6" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#856FE6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#856FE6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#856FE6" stopOpacity="0.1" />
          </linearGradient>

          {/* Packet Gradients for different contributors */}
          <radialGradient id="packet-glow-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#4ade80" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-6" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background rotating rings */}
        <g className="opacity-20" stroke="#856FE6" strokeWidth="1" fill="none">
          <circle cx="200" cy="200" r="150" strokeDasharray="4 8">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="60s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="200" cy="200" r="100" strokeDasharray="2 6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 200 200"
              to="0 200 200"
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="200" cy="200" r="50" strokeDasharray="1 4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Connection Paths */}
        <g fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <path
            id="path1"
            d="M 200 200 C 150 100, 80 120, 60 60"
            stroke="url(#line-gradient-1)"
          />
          <path
            id="path2"
            d="M 200 200 C 280 150, 320 80, 340 60"
            stroke="url(#line-gradient-2)"
          />
          <path
            id="path3"
            d="M 200 200 C 120 280, 80 320, 60 340"
            stroke="url(#line-gradient-2)"
          />
          <path
            id="path4"
            d="M 200 200 C 250 300, 320 280, 340 340"
            stroke="url(#line-gradient-1)"
          />
          <path
            id="path5"
            d="M 200 200 C 100 200, 60 250, 40 200"
            stroke="url(#line-gradient-1)"
          />
          <path
            id="path6"
            d="M 200 200 C 300 200, 340 150, 360 200"
            stroke="url(#line-gradient-2)"
          />
        </g>

        {/* Data Packets flowing INWARDS (keyPoints="1;0") */}
        <g>
          {/* Path 1 Packets */}
          <circle r="4" fill="url(#packet-glow-1)" filter="url(#glow-subtle)">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath href="#path1" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-1)" filter="url(#glow-subtle)">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="1.5s">
              <mpath href="#path1" />
            </animateMotion>
          </circle>

          {/* Path 2 Packets */}
          <circle r="4" fill="url(#packet-glow-2)" filter="url(#glow-subtle)">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="1s">
              <mpath href="#path2" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-2)" filter="url(#glow-subtle)">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="3s">
              <mpath href="#path2" />
            </animateMotion>
          </circle>

          {/* Path 3 Packets */}
          <circle r="4" fill="url(#packet-glow-3)" filter="url(#glow-subtle)">
            <animateMotion dur="3.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="0.5s">
              <mpath href="#path3" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-3)" filter="url(#glow-subtle)">
            <animateMotion dur="3.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="2.25s">
              <mpath href="#path3" />
            </animateMotion>
          </circle>

          {/* Path 4 Packets */}
          <circle r="4" fill="url(#packet-glow-4)" filter="url(#glow-subtle)">
            <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="2s">
              <mpath href="#path4" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-4)" filter="url(#glow-subtle)">
            <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="4.25s">
              <mpath href="#path4" />
            </animateMotion>
          </circle>

          {/* Path 5 Packets */}
          <circle r="4" fill="url(#packet-glow-5)" filter="url(#glow-subtle)">
            <animateMotion dur="2.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="1.5s">
              <mpath href="#path5" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-5)" filter="url(#glow-subtle)">
            <animateMotion dur="2.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="0.25s">
              <mpath href="#path5" />
            </animateMotion>
          </circle>

          {/* Path 6 Packets */}
          <circle r="4" fill="url(#packet-glow-6)" filter="url(#glow-subtle)">
            <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="0.2s">
              <mpath href="#path6" />
            </animateMotion>
          </circle>
          <circle r="2" fill="url(#packet-glow-6)" filter="url(#glow-subtle)">
            <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="1.8s">
              <mpath href="#path6" />
            </animateMotion>
          </circle>
        </g>

        {/* Outer Nodes (Contributors) */}
        <g>
          {/* Contributor 1 */}
          <g transform="translate(60, 60)">
            <circle r="16" fill="#050505" stroke="#4ade80" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#4ade80" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Contributor 2 */}
          <g transform="translate(340, 60)">
            <circle r="16" fill="#050505" stroke="#60a5fa" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#60a5fa" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Contributor 3 */}
          <g transform="translate(60, 340)">
            <circle r="16" fill="#050505" stroke="#f472b6" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#f472b6" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#f472b6" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Contributor 4 */}
          <g transform="translate(340, 340)">
            <circle r="16" fill="#050505" stroke="#fbbf24" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#fbbf24" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Contributor 5 */}
          <g transform="translate(40, 200)">
            <circle r="16" fill="#050505" stroke="#a78bfa" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#a78bfa" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Contributor 6 */}
          <g transform="translate(360, 200)">
            <circle r="16" fill="#050505" stroke="#38bdf8" strokeWidth="1.5" filter="url(#glow-subtle)">
              <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cy="-3" r="4" fill="#38bdf8" opacity="0.9" />
            <path d="M -7 7 C -7 3, 7 3, 7 7" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>
        </g>

        {/* Central Node (The Repository / Hub) */}
        <g transform="translate(200, 200)">
          {/* Outer pulse */}
          <circle r="45" fill="none" stroke="#856FE6" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="35;55;35" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
          </circle>
          
          {/* Outer glow */}
          <circle r="35" fill="#050505" stroke="#856FE6" strokeWidth="2" filter="url(#glow)">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Inner dark hub */}
          <circle r="25" fill="#000000" stroke="#1a1a1a" strokeWidth="3" />
          
          {/* Repository symbol (Git branch style) */}
          <g stroke="#856FE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="-4" y1="-8" x2="-4" y2="8" />
            <circle cx="-4" cy="-8" r="2" fill="#000" />
            <circle cx="-4" cy="8" r="2" fill="#000" />
            
            <path d="M -4 2 C 4 2, 6 -2, 6 -6" fill="none" />
            <circle cx="6" cy="-6" r="2" fill="#000" />
          </g>
          
          {/* Core pulse */}
          <circle r="2" fill="#fff" filter="url(#glow)">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Floating background particles */}
        <g fill="#856FE6" opacity="0.6">
          <circle cx="120" cy="150" r="1.5">
            <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;130" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="250" r="2">
            <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="cy" values="250;220" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="150" cy="280" r="1">
            <animate attributeName="opacity" values="0;0.9;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="cy" values="280;260" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="250" cy="120" r="1.5">
            <animate attributeName="opacity" values="0;0.7;0" dur="3.5s" repeatCount="indefinite" begin="2s" />
            <animate attributeName="cy" values="120;100" dur="3.5s" repeatCount="indefinite" begin="2s" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
