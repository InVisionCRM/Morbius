"use client";

import { useEffect, useState, useRef } from "react";

export default function ProveXMysterySection() {
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number | null = null;
    let startTime: number;
    let videoDuration: number;

    const handleLoadedMetadata = () => {
      videoDuration = video.duration;
      // Always use manual reverse playback for reliability
      startManualReverse();
    };

    const startManualReverse = () => {
      // Start from the end
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
        
        // Update currentTime to play in reverse
        video.currentTime = newTime;
        
        animationFrameId = requestAnimationFrame(updateReverse);
      };
      
      // Start playing (even though we'll control the time manually)
      video.play().then(() => {
        // Immediately pause and control playback manually
        video.pause();
        animationFrameId = requestAnimationFrame(updateReverse);
      }).catch((error) => {
        console.error("Error playing video:", error);
        // Still try to start reverse playback even if play() fails
        animationFrameId = requestAnimationFrame(updateReverse);
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

  // Helper function to render text with "Blood" in red if it's the last word
  const renderTextWithBloodRed = (text: string) => {
    const words = text.split(/(\s+)/);
    const lastWordIndex = words.length - 1;
    const lastWord = words[lastWordIndex]?.trim();
    
    return words.map((word, index) => {
      const isLastWord = index === lastWordIndex && lastWord === "Blood";
      if (isLastWord) {
        return (
          <span key={index} style={{ color: "#8B0000" }}>
            {word}
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video with 40% opacity */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/Web ui/mysterybackground.mp4"
          className="w-full h-full object-cover opacity-40"
          autoPlay
          muted
          playsInline
        />
        {/* Black/20 overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Centered Text with Fade In/Out Parallax Effect */}
      <div 
        className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8"
        style={{ opacity }}
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-white">
          {renderTextWithBloodRed("...and this was the original name Richard Heart chose for ProveX...Why did he change it last minute?....")}
        </p>
      </div>
    </section>
  );
}

