"use client";

import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";

export default function MorbiusDescriptionSection() {
  const {
    sectionRef,
    videoRef,
    progress,
    textReveal,
  } = useScrollScrubVideo({ revealStart: 0.9, revealRange: 0.08, fadeStart: 0.8, fadeRange: 0.2 });

  const parallaxOffset = progress * 140;

  return (
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed"
            style={{
              opacity: textReveal,
              transform: `scale(${1.12 - textReveal * 0.12})`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            Morbius was a Marvel Character who was a scientist with a rare blood disease and would accidentally transform into a &ldquo;living vampire&rdquo; with superhuman strength, flight, and a craving for{" "}
            <span className="text-[#8B0000] font-semibold">
              blood
            </span>
            ...
          </p>
        </div>
      </div>
    </section>
  );
}
