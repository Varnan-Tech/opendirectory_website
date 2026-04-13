import React from 'react';
import { Aperture, Code, BrainCircuit, Box, Command, Terminal } from 'lucide-react';

export function OrbitLogos() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] pointer-events-none opacity-30 z-0">
      <div className="w-full h-full rounded-full border border-dashed border-black/20 relative animate-[spin_60s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <Aperture className="w-6 h-6 text-blue-500" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <Code className="w-6 h-6 text-purple-500" />
        </div>
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <BrainCircuit className="w-6 h-6 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <Box className="w-6 h-6 text-orange-500" />
        </div>
        <div className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <Command className="w-6 h-6 text-red-500" />
        </div>
        <div className="absolute bottom-[15%] right-[15%] translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-full shadow-sm border border-black/10">
          <Terminal className="w-6 h-6 text-gray-800" />
        </div>
      </div>
    </div>
  );
}
