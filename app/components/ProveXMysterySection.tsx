"use client";

import { useMemo } from "react";
import { clamp } from "../utils/math";
import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";
import { ScrollTypewriter } from "@/components/ui/typewriter-effect";

export default function ProveXMysterySection() {
  const {
    sectionRef,
    videoRef,
    progress,
    fadeToBlack,
    textReveal,
  } = useScrollScrubVideo({ revealStart: 0.9, revealRange: 0.08, fadeStart: 0.8, fadeRange: 0.2 });

  const parallaxOffset = progress * 140;

  const baseText =
    "...and this was the original name Richard Heart chose for ProveX...Why did he change it last minute?....";
  const words = useMemo(() => baseText.split(" "), [baseText]);
  const typewriterWords = useMemo(
    () =>
      words.map((word) => {
        const normalized = word.replace(/[^\w]/g, "").toLowerCase();
        if (normalized === "provex") {
          return { text: word, className: "text-[#c92d2d]" };
        }
        if (normalized === "blood") {
          return { text: word, className: "text-[#8B0000]" };
        }
        return { text: word };
      }),
    [words]
  );
  const typingProgress = clamp((progress - 0.2) / 0.75);

  return (
    <section ref={sectionRef} className="relative h-[250vh] md:h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/MorbiusMovie3.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-black" style={{ opacity: fadeToBlack }} />
        </div>

        {/* Parallax sparkles */}
        <div
          className="absolute inset-0 opacity-25"
          style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}
        >
          <div className="absolute top-12 left-16 h-2 w-2 rounded-full bg-purple-500 blur-sm" />
          <div className="absolute top-1/3 right-20 h-3 w-3 rounded-full bg-blue-500 blur-sm" />
          <div className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-purple-400 blur-sm" />
          <div className="absolute top-1/2 right-1/3 h-2 w-2 rounded-full bg-blue-400 blur-sm" />
        </div>

        {/* Text Reveal */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div
            style={{
              opacity: textReveal,
              transform: `translateY(${(1 - textReveal) * 40}px)`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <ScrollTypewriter
              words={typewriterWords}
              progress={typingProgress}
              className="font-bold leading-relaxed text-lg sm:text-xl md:text-2xl lg:text-3xl text-white"
              cursorClassName="bg-white/80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
