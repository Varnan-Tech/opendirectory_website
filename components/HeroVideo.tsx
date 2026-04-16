"use client";

import React, { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="aspect-[1480/1080] w-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 bottom-0 h-full w-[129.7%] -left-[14.86%] max-w-none object-fill"
      >
        <source src="/opendirectorydev_hero_video.webm" type="video/webm" />
      </video>
    </div>
  );
}
