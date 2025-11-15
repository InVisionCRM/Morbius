"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MorbiusDescriptionSection from "./components/MorbiusDescriptionSection";
import ProveXMysterySection from "./components/ProveXMysterySection";
import JoinDiscussionSection from "./components/JoinDiscussionSection";
import StatsSection from "./components/StatsSection";
import MoreSection from "./components/MoreSection";
import BuyNowSection from "./components/BuyNowSection";

// Professional easing function
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Helper function to calculate progress based on viewport center
function useViewportCenterProgress() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        const maxDistance = window.innerHeight / 2;
        const calculatedProgress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
        setProgress(calculatedProgress);
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

  return { progress, containerRef };
}

// Helper function for fade in/out based on viewport position (30% bottom -> 50% center -> 30% top)
function useViewportFadeProgress() {
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;

        // Define key positions
        const fadeInStart = viewportHeight * 0.7; // 30% from bottom
        const fullVisible = viewportHeight * 0.5; // Center (50%)
        const fadeOutEnd = viewportHeight * 0.3; // 30% from top

        let calculatedOpacity = 0;

        if (elementCenter >= fullVisible && elementCenter <= fadeInStart) {
          // Fading in from 30% bottom to center
          const range = fadeInStart - fullVisible;
          const position = fadeInStart - elementCenter;
          calculatedOpacity = position / range;
        } else if (elementCenter >= fadeOutEnd && elementCenter < fullVisible) {
          // Fading out from center to 30% top
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

  return { opacity, sectionRef };
}

export default function HomePage() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number | null = null;
    let startTime: number;
    let videoDuration: number;

    const handleLoadedMetadata = () => {
      videoDuration = video.duration;
      // Start from the end
      video.currentTime = videoDuration;
      
      // Try negative playback rate first (supported in some browsers)
      try {
        video.playbackRate = -1;
        video.play().catch(() => {
          // Fallback to manual reverse playback
          startManualReverse();
        });
      } catch {
        // Fallback to manual reverse playback
        startManualReverse();
      }
    };

    const startManualReverse = () => {
      video.currentTime = videoDuration;
      startTime = Date.now();
      let lastUpdateTime = 0;
      const updateThreshold = 33; // Update every ~33ms (30fps) to reduce seeking overhead
      
      const updateReverse = (timestamp: number) => {
        if (timestamp - lastUpdateTime < updateThreshold) {
          animationFrameId = requestAnimationFrame(updateReverse);
          return;
        }
        lastUpdateTime = timestamp;
        
        const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
        const newTime = Math.max(0, videoDuration - elapsed);
        
        if (newTime <= 0) {
          video.currentTime = 0;
          video.pause();
          animationFrameId = null;
          return;
        }
        
        // Only update if there's a meaningful change to reduce seeking
        if (Math.abs(video.currentTime - newTime) > 0.05) {
          video.currentTime = newTime;
        }
        
        animationFrameId = requestAnimationFrame(updateReverse);
      };
      
      video.play().then(() => {
        animationFrameId = requestAnimationFrame(updateReverse);
      }).catch((error) => {
        console.error("Error playing video:", error);
      });
    };

    if (video.readyState >= 2) {
      // Metadata already loaded
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <main className="bg-black">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 border-b border-white/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center px-3 md:px-6 py-2 md:py-4 gap-2 md:gap-0">
          {/* Mobile: Top row - Switch and socials */}
          <div className="flex items-center justify-between w-full md:w-auto md:flex-1 md:justify-start">
            <button
              onClick={() => {
                const buyNowSection = document.getElementById("buy-now");
                if (buyNowSection) {
                  buyNowSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-3 md:px-4 py-1.5 md:py-2 bg-lime-600/50 hover:bg-lime-600/70 rounded-lg transition-colors text-white text-sm md:text-base font-medium"
            >
              Switch
            </button>
            
            {/* Mobile: Social icons only */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="https://t.me/morbius_cash"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
                </svg>
              </a>
              <a
                href="https://pump.tires/token/0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-colors"
                aria-label="Pump"
              >
                <span className="text-xs text-white font-bold">PUMP</span>
              </a>
            </div>
          </div>
          
          {/* Center - Address and Copy button */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-center w-full md:w-auto">
            <code className="text-xs md:text-sm font-mono text-white inline-flex items-center m-0 p-0">
              0xB7d4...c6F1
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText("0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1");
              }}
              className="p-1.5 transition-opacity hover:opacity-80 inline-flex items-center justify-center gap-1.5 md:gap-2"
              aria-label="Copy address"
            >
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-white font-medium hidden md:inline">Copy</span>
            </button>
          </div>
          
          {/* Right side - Telegram and PUMP (Desktop only) */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <a
              href="https://t.me/morbius_cash"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
              </svg>
              <span className="text-xs text-white font-medium">Telegram</span>
            </a>
            <a
              href="https://pump.tires/token/0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg transition-colors"
            >
              <span className="text-xs text-white font-bold">PUMP</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/Web ui/hero-vid.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Parallax Background Elements */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-purple-500 blur-sm" />
          <div className="absolute top-40 right-20 h-3 w-3 rounded-full bg-blue-500 blur-sm" />
          <div className="absolute bottom-40 left-1/4 h-2 w-2 rounded-full bg-purple-400 blur-sm" />
          <div className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-blue-400 blur-sm" />
        </div>

        {/* Main Hero Text with Parallax */}
        <div className="relative z-10 flex items-center justify-center gap-1 md:gap-2 px-4 md:px-6">
          {letters.map((letter, i) => {
            return (
              <div
                key={i}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-purple-800 to-purple-950 bg-clip-text text-transparent"
                style={{
                  opacity: 1,
                  transform: `translateY(${scrollY * 0.3}px)`,
                  fontFamily: "var(--font-montserrat)",
                  letterSpacing: "-0.02em",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          style={{ opacity: 1 - progress }}
        >
          <span className="text-sm text-gray-500 font-light">Scroll to explore</span>
          <svg
            className="h-6 w-6 text-gray-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <MorbiusDescriptionSection />
      <ProveXMysterySection />
      <JoinDiscussionSection />
      <StatsSection />
      <MoreSection />
      <BuyNowSection />

    </main>
  );
}
