"use client";

import { useEffect, useState, useRef } from "react";

export default function ProveXMysterySection() {
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;

        // Longer, smoother fade range - from 80% bottom to 20% top
        const fadeInStart = viewportHeight * 0.8; // 20% from bottom
        const fullVisible = viewportHeight * 0.5; // Center (50%)
        const fadeOutEnd = viewportHeight * 0.2; // 20% from top

        let calculatedOpacity = 0;

        if (elementCenter >= fullVisible && elementCenter <= fadeInStart) {
          // Fading in from 20% bottom to center (longer range)
          const range = fadeInStart - fullVisible;
          const position = fadeInStart - elementCenter;
          calculatedOpacity = position / range;
        } else if (elementCenter >= fadeOutEnd && elementCenter < fullVisible) {
          // Fading out from center to 20% top (longer range)
          const range = fullVisible - fadeOutEnd;
          const position = elementCenter - fadeOutEnd;
          calculatedOpacity = position / range;
        } else if (elementCenter > fadeInStart || elementCenter < fadeOutEnd) {
          calculatedOpacity = 0;
        } else {
          calculatedOpacity = 1;
        }

        setOpacity(Math.max(0, Math.min(1, calculatedOpacity)));
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

  // Calculate blood red color based on opacity (interpolate from white to blood red)
  const getTextColor = () => {
    const bloodRed = "#8B0000"; // Dark blood red
    const white = "#FFFFFF";
    
    // Interpolate between white and blood red based on opacity
    const r1 = parseInt(white.slice(1, 3), 16);
    const g1 = parseInt(white.slice(3, 5), 16);
    const b1 = parseInt(white.slice(5, 7), 16);
    
    const r2 = parseInt(bloodRed.slice(1, 3), 16);
    const g2 = parseInt(bloodRed.slice(3, 5), 16);
    const b2 = parseInt(bloodRed.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * opacity);
    const g = Math.round(g1 + (g2 - g1) * opacity);
    const b = Math.round(b1 + (b2 - b1) * opacity);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with 40% opacity */}
      <div className="absolute inset-0">
        <img
          src="/Web ui/89a1cd4f-f22d-42d0-bbc3-d66753a265b6.png"
          alt="ProveX Mystery Background"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Black/20 overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Centered Text with Fade In/Out Parallax Effect and Blood Red Transition */}
      <div 
        className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8"
        style={{ opacity }}
      >
        <p className="text-2xl md:text-3xl font-bold leading-relaxed" style={{ color: getTextColor() }}>
          ...and this was the original name Richard Heart chose for ProveX...Why did he change it last minute?....
        </p>
        
        <p className="text-xl md:text-2xl font-bold leading-relaxed" style={{ color: getTextColor() }}>
          Join the Morbius telegram{" "}
          <a 
            href="https://t.me/morbius_cash" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: getTextColor() }}
          >
            @morbius_cash
          </a>{" "}
          to join the discussion
        </p>
      </div>
    </section>
  );
}

