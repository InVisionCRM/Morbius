"use client";

import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";
import { clamp } from "../utils/math";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const {
    sectionRef,
    videoRef,
    progress,
    fadeToBlack,
    textReveal,
    videoDuration,
    videoReady,
  } = useScrollScrubVideo({
    fadeStart: 0.55,
    fadeRange: 0.25,
    revealStart: 0.78,
    revealRange: 0.12,
  });

  // Calculate section height based on video duration
  // Using 100vh per second of video for a smooth scroll experience
  const [sectionHeight, setSectionHeight] = useState("220vh");
  
  useEffect(() => {
    if (videoDuration > 0) {
      // 100vh per second of video, with a minimum of 200vh
      const calculatedHeight = Math.max(videoDuration * 100, 200);
      setSectionHeight(`${calculatedHeight}vh`);
    }
  }, [videoDuration]);

  const parallaxOffset = progress * 120;
  const overlayOpacity = Math.max(fadeToBlack, clamp((progress - 0.55) / 0.3));

  return (
    <section ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/hero.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        </div>

        <div
          className="absolute inset-0 opacity-25"
          style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}
        >
          <div className="absolute top-16 left-12 h-2 w-2 rounded-full bg-purple-500 blur-sm" />
          <div className="absolute top-1/3 right-16 h-3 w-3 rounded-full bg-blue-500 blur-sm" />
          <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-purple-400 blur-sm" />
          <div className="absolute top-1/4 right-1/3 h-2 w-2 rounded-full bg-blue-400 blur-sm" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-6">
          <div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.35em] text-gray-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            style={{
              opacity: textReveal,
              transform: `translateY(${(1 - textReveal) * 50}px)`,
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            MORBIUS
          </div>
        </div>
      </div>
    </section>
  );
}
