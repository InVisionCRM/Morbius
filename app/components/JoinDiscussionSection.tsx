"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clamp } from "../utils/math";
import { ScrollTypewriter } from "@/components/ui/typewriter-effect";

export default function JoinDiscussionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const words = useMemo(
    () => ["Join", "the", "MorbNation", "and", "find", "out", "why..."],
    [],
  );
  const typewriterWords = useMemo(
    () =>
      words.map((word) => ({
        text: word,
        className: word === "why..." ? "text-[#c92d2d]" : undefined,
      })),
    [words]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const total = rect.height - viewHeight;
      const scroll =
        total <= 0 ? (rect.top <= 0 ? 1 : 0) : clamp(-rect.top / total);
      setProgress(scroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const typingProgress = clamp(progress * 1.1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white"
          style={{
            transform: `translateY(${(1 - progress) * 60}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          <ScrollTypewriter
            words={typewriterWords}
            progress={typingProgress}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white"
            cursorClassName="bg-[#c92d2d]"
          />
        </div>
        
        <a
          href="https://t.me/morbius_cash"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center hover:opacity-80 transition-opacity min-w-[60px] min-h-[60px] md:min-w-0 md:min-h-0"
          aria-label="Join Telegram"
        >
          <svg className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
