"use client";

import { useEffect, useState, useRef } from "react";

export default function MorbiusDescriptionSection() {
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;

        // Define key positions for fade in only
        const fadeInStart = viewportHeight * 0.7; // 30% from bottom
        const fullVisible = viewportHeight * 0.5; // Center (50%)

        let calculatedOpacity = 0;

        if (elementCenter >= fullVisible && elementCenter <= fadeInStart) {
          // Fading in from 30% bottom to center
          const range = fadeInStart - fullVisible;
          const position = fadeInStart - elementCenter;
          calculatedOpacity = position / range;
        } else if (elementCenter < fullVisible) {
          // Once past center, stay at full opacity (no fade out)
          calculatedOpacity = 1;
        } else {
          // Before fade-in starts
          calculatedOpacity = 0;
        }

        // Only fade in - once it reaches 1, it stays at 1
        setOpacity((prevOpacity) => {
          const newOpacity = Math.max(0, Math.min(1, calculatedOpacity));
          // Never decrease opacity (no fade out)
          return Math.max(prevOpacity, newOpacity);
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with 40% opacity */}
      <div className="absolute inset-0">
        <img
          src="/Web ui/mobius.jpeg"
          alt="Morbius Background"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Black/20 overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Centered Text with Fade In Parallax Effect */}
      <div 
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
          Morbius was a Marvel Character who was a scientist with a rare blood disease and would accidentally transform into a "living vampire" with superhuman strength, flight, and a craving for{" "}
          <span className="text-[#8B0000] font-semibold">
            blood
          </span>
          ...
        </p>
      </div>
    </section>
  );
}

