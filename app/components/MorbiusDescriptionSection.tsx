"use client";

import { useMemo } from "react";
import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";
import { clamp } from "../utils/math";
const easeInOutCubic = (x: number) =>
  x <= 0
    ? 0
    : x >= 1
    ? 1
    : x < 0.5
    ? 4 * x * x * x
    : 1 - Math.pow(-2 * x + 2, 3) / 2;

export default function MorbiusDescriptionSection() {
  const {
    sectionRef,
    videoRef,
    progress,
    textReveal,
  } = useScrollScrubVideo({ revealStart: 0.9, revealRange: 0.08, fadeStart: 0.8, fadeRange: 0.2 });

  const parallaxOffset = progress * 140;
  const storyBlocks = useMemo(
    () => [
      "Did you know that the original name of ProveX was actually Morbius?",
      "Why Though?",
      <>
        Morbius was a Marvel Character who was a scientist with a rare blood disease and would accidentally transform
        into a &ldquo;living vampire&rdquo; with superhuman strength, flight, and a craving for{" "}
        <span className="text-[#8B0000] font-semibold">blood</span>...
      </>,
    ],
    []
  );
  const segmentLength = 1 / storyBlocks.length;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap');
        .gabarito-mainfont {
          font-family: "Gabarito", sans-serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
        }
      `}</style>
      <section ref={sectionRef} className="relative h-[250vh] md:h-[280vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/Web ui/rhfade.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Parallax sparkles */}
        <div
          className="absolute inset-0 opacity-25"
          style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}
        >
          <div className="absolute top-16 left-12 h-2 w-2 rounded-full bg-purple-500 blur-sm" />
          <div className="absolute top-1/3 right-16 h-3 w-3 rounded-full bg-blue-500 blur-sm" />
          <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-purple-400 blur-sm" />
          <div className="absolute top-1/4 right-1/3 h-2 w-2 rounded-full bg-blue-400 blur-sm" />
        </div>

        {/* Text Reveal */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center space-y-6">
          {storyBlocks.map((block, index) => {
            const start = index * segmentLength;
            const local = clamp((progress - start) / segmentLength);
            const eased = easeInOutCubic(local);
            const opacity =
              local <= 0
                ? 0
                : eased;
            const scale = 1;
            const translateY = 0;
            const translateX = (1 - Math.min(eased, 1)) * 80;

            return (
              <p
                key={index}
                className={`gabarito-mainfont ${
                  index === 1 ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                } text-white leading-relaxed`}
                style={{
                  opacity,
                  transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                  transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
                }}
              >
                {block}
              </p>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
