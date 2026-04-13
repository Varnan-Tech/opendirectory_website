"use client";

import React from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}

export function ShimmerButton({ children, className = "", primary = true, ...props }: ShimmerButtonProps) {
  if (primary) {
    return (
      <button 
        className={`relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
        {...props}
      >
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
        <span className="relative z-10 flex items-center gap-2 tracking-tight">{children}</span>
      </button>
    );
  }

  return (
    <button 
      className={`relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-transparent px-8 font-medium text-white transition-all hover:bg-white/[0.02] hover:border-white/20 active:scale-[0.98] ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 tracking-tight">{children}</span>
    </button>
  );
}
