"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AnimationsPage() {
  const [activeTab, setActiveTab] = useState<"new" | "parallax" | "morbius">("new");

  return (
    <main className="flex-1 bg-[#0f1117]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Animation Gallery</h1>
          <p className="text-gray-400">Unique Parallax & Animation Effects</p>
          <Link href="/" className="mt-4 inline-block text-sky-400 hover:text-sky-300">
            ← Back to Home
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("new")}
            className={`rounded-lg px-8 py-3 text-lg font-medium transition-colors ${
              activeTab === "new"
                ? "bg-sky-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            New (10)
          </button>
          <button
            onClick={() => setActiveTab("parallax")}
            className={`rounded-lg px-8 py-3 text-lg font-medium transition-colors ${
              activeTab === "parallax"
                ? "bg-sky-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Parallax Scrolling (10)
          </button>
          <button
            onClick={() => setActiveTab("morbius")}
            className={`rounded-lg px-8 py-3 text-lg font-medium transition-colors ${
              activeTab === "morbius"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Morbius (30)
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "new" && <NewAnimations />}
        {activeTab === "parallax" && <ParallaxAnimations />}
        {activeTab === "morbius" && <MorbiusAnimations />}
      </div>
    </main>
  );
}

// New Animations Tab
function NewAnimations() {
  return (
    <div className="space-y-24">
      {/* Animation 1: Classic Parallax Layers */}
      <AnimationCard
        title="1. Classic Parallax Scrolling"
        prompt="Create a parallax scrolling effect with 3 layers (background, middle, foreground) that move at different speeds (0.3x, 0.6x, 1x) as the user scrolls down the page."
      >
        <ParallaxLayers />
      </AnimationCard>

      {/* Animation 2: 3D Tilt Card */}
      <AnimationCard
        title="2. 3D Tilt on Mouse Move"
        prompt="Create a card that tilts in 3D based on mouse position within the card boundaries, with smooth transitions and a subtle shadow that follows the tilt direction."
      >
        <TiltCard />
      </AnimationCard>

      {/* Animation 3: Infinite Marquee */}
      <AnimationCard
        title="3. Infinite Scrolling Marquee"
        prompt="Create an infinitely scrolling horizontal marquee with text that loops seamlessly. Use CSS animations for smooth continuous movement from right to left."
      >
        <InfiniteMarquee />
      </AnimationCard>

      {/* Animation 4: Particle Trail */}
      <AnimationCard
        title="4. Mouse Particle Trail"
        prompt="Create a particle system that follows the mouse cursor, leaving a trail of particles that fade out and shrink over time. Each particle should have random velocity and color variations."
      >
        <ParticleTrail />
      </AnimationCard>

      {/* Animation 5: Morphing Blob */}
      <AnimationCard
        title="5. Morphing Blob Animation"
        prompt="Create an animated blob shape using SVG that continuously morphs between different organic shapes using smooth bezier curve animations with random values."
      >
        <MorphingBlob />
      </AnimationCard>

      {/* Animation 6: Stagger Fade In */}
      <AnimationCard
        title="6. Stagger Fade-In on Scroll"
        prompt="Create a grid of cards that fade in and slide up with a staggered delay when they enter the viewport. Use Intersection Observer API to trigger animations on scroll."
      >
        <StaggerFadeIn />
      </AnimationCard>

      {/* Animation 7: 3D Rotating Cube */}
      <AnimationCard
        title="7. Rotating 3D Cube"
        prompt="Create a 3D cube using CSS transforms with 6 faces, each with different colors. The cube should continuously rotate on both X and Y axes with smooth animation."
      >
        <RotatingCube />
      </AnimationCard>

      {/* Animation 8: Ripple Effect */}
      <AnimationCard
        title="8. Click Ripple Wave Effect"
        prompt="Create a ripple effect that emanates from where the user clicks, with expanding circles that fade out. Multiple ripples should be able to exist simultaneously."
      >
        <RippleEffect />
      </AnimationCard>

      {/* Animation 9: Text Reveal */}
      <AnimationCard
        title="9. Text Reveal with Mask"
        prompt="Create a text reveal animation where text appears from behind a moving gradient mask that slides from left to right, revealing letters progressively as you scroll."
      >
        <TextReveal />
      </AnimationCard>

      {/* Animation 10: Floating Elements */}
      <AnimationCard
        title="10. Floating Elements with Depth"
        prompt="Create multiple floating elements that move vertically at different speeds and amplitudes, creating a depth effect. Use sine waves for smooth oscillating motion with offset delays."
      >
        <FloatingElements />
      </AnimationCard>
    </div>
  );
}

// Parallax Scrolling Tab
function ParallaxAnimations() {
  return (
    <div className="space-y-24">
      {/* Parallax 1: Horizontal Slide */}
      <AnimationCard
        title="1. Horizontal Parallax Cards"
        prompt="Create horizontal parallax where multiple cards slide left and right at different speeds (some negative, some positive) as the user scrolls down, creating a dynamic layered effect."
      >
        <HorizontalParallax />
      </AnimationCard>

      {/* Parallax 2: Zoom Scale */}
      <AnimationCard
        title="2. Zoom Scale Parallax"
        prompt="Create a parallax effect where elements scale up or down at different rates as you scroll. Background should scale from small to large while foreground scales inversely."
      >
        <ZoomParallax />
      </AnimationCard>

      {/* Parallax 3: Opacity Fade */}
      <AnimationCard
        title="3. Opacity Parallax Layers"
        prompt="Create multiple text layers that fade in and out at different scroll positions and speeds, creating a ghosting effect where layers appear and disappear at different depths."
      >
        <OpacityParallax />
      </AnimationCard>

      {/* Parallax 4: Rotation Parallax */}
      <AnimationCard
        title="4. Rotation Parallax Effect"
        prompt="Create elements that rotate at different speeds based on scroll position. Each element should have a different rotation axis (X, Y, Z) and rotation speed multiplier."
      >
        <RotationParallax />
      </AnimationCard>

      {/* Parallax 5: Diagonal Movement */}
      <AnimationCard
        title="5. Diagonal Parallax Motion"
        prompt="Create a parallax effect where elements move diagonally (both X and Y axis) at different speeds and angles as you scroll, creating a dynamic cross-directional movement."
      >
        <DiagonalParallax />
      </AnimationCard>

      {/* Parallax 6: Blur Depth */}
      <AnimationCard
        title="6. Blur Depth Parallax"
        prompt="Create a depth-of-field parallax effect where background elements blur more as you scroll while foreground elements stay sharp. Use CSS blur filter with varying intensities."
      >
        <BlurParallax />
      </AnimationCard>

      {/* Parallax 7: Color Shift */}
      <AnimationCard
        title="7. Color Shift Parallax"
        prompt="Create a parallax effect where elements shift colors based on scroll position. Use HSL color values that change hue at different rates for each layer to create a rainbow transition effect."
      >
        <ColorShiftParallax />
      </AnimationCard>

      {/* Parallax 8: Split Screen */}
      <AnimationCard
        title="8. Split Screen Parallax"
        prompt="Create a split-screen parallax where left side elements move up while right side elements move down at the same scroll position, creating a mirror/opposite effect with a vertical divider."
      >
        <SplitScreenParallax />
      </AnimationCard>

      {/* Parallax 9: Spiral Inward */}
      <AnimationCard
        title="9. Spiral Parallax Effect"
        prompt="Create elements arranged in a circle that spiral inward toward the center as you scroll. Each element should rotate around the center point while also moving closer at different speeds."
      >
        <SpiralParallax />
      </AnimationCard>

      {/* Parallax 10: Wave Pattern */}
      <AnimationCard
        title="10. Wave Pattern Parallax"
        prompt="Create multiple horizontal bars that move in sine wave patterns at different frequencies and amplitudes based on scroll position, creating an ocean wave effect with varying speeds."
      >
        <WaveParallax />
      </AnimationCard>
    </div>
  );
}

// Morbius Animations Tab
function MorbiusAnimations() {
  return (
    <div className="space-y-24">
      {/* Morbius 1: Letter by Letter Reveal */}
      <AnimationCard
        title="1. Letter-by-Letter Reveal"
        prompt="Create a parallax effect where each letter of 'MORBIUS' appears one by one at different scroll positions, with each letter fading in and sliding up from below at staggered scroll thresholds."
      >
        <LetterRevealMorbius />
      </AnimationCard>

      {/* Morbius 2: Depth Layers */}
      <AnimationCard
        title="2. Layered Depth Effect"
        prompt="Display 'MORBIUS' with each letter positioned at different z-depths, moving at different speeds (0.2x to 1x) as you scroll to create a 3D depth parallax effect."
      >
        <DepthLayersMorbius />
      </AnimationCard>

      {/* Morbius 3: Split and Merge */}
      <AnimationCard
        title="3. Letter Split & Merge"
        prompt="Create an animation where letters of 'MORBIUS' start scattered across the screen and converge together to form the word as you scroll down, using parallax timing for each letter."
      >
        <SplitMergeMorbius />
      </AnimationCard>

      {/* Morbius 4: Individual Rotation */}
      <AnimationCard
        title="4. Rotating Letters Parallax"
        prompt="Animate each letter of 'MORBIUS' to rotate individually on different axes (X, Y, Z) based on scroll position, with each letter rotating at different speeds and directions."
      >
        <RotatingLettersMorbius />
      </AnimationCard>

      {/* Morbius 5: Wave Pattern */}
      <AnimationCard
        title="5. Wave Motion Typography"
        prompt="Display 'MORBIUS' letters moving in a sine wave pattern vertically, with each letter phase-shifted to create a flowing wave effect that animates based on scroll position."
      >
        <WaveMotionMorbius />
      </AnimationCard>

      {/* Morbius 6: Rainbow Gradient */}
      <AnimationCard
        title="6. Color Gradient Shift"
        prompt="Create 'MORBIUS' text where each letter cycles through rainbow colors using HSL values that change at different rates as you scroll, creating a dynamic color-shifting parallax effect."
      >
        <ColorGradientMorbius />
      </AnimationCard>

      {/* Morbius 7: Size Variation */}
      <AnimationCard
        title="7. Scale Size Parallax"
        prompt="Animate 'MORBIUS' letters to grow and shrink at different rates based on scroll position, with alternating letters scaling up while others scale down for dynamic size variation."
      >
        <ScaleSizeMorbius />
      </AnimationCard>

      {/* Morbius 8: Stagger Slide */}
      <AnimationCard
        title="8. Multi-Direction Slide In"
        prompt="Have each letter of 'MORBIUS' slide in from different directions (top, bottom, left, right) with staggered delays based on scroll position, converging to form the complete word."
      >
        <StaggerSlideMorbius />
      </AnimationCard>

      {/* Morbius 9: 3D Perspective */}
      <AnimationCard
        title="9. 3D Perspective Depth"
        prompt="Display 'MORBIUS' in 3D space with perspective, where letters move toward and away from the viewer at different speeds as you scroll, creating depth perception with CSS 3D transforms."
      >
        <Perspective3DMorbius />
      </AnimationCard>

      {/* Morbius 10: Blur to Focus */}
      <AnimationCard
        title="10. Blur to Sharp Focus"
        prompt="Start with 'MORBIUS' completely blurred, then progressively sharpen each letter at different scroll positions and speeds, with letters also moving into position from various offsets."
      >
        <BlurFocusMorbius />
      </AnimationCard>

      {/* Morbius 11: Circular Assembly */}
      <AnimationCard
        title="11. Circular Assembly"
        prompt="Letters of 'MORBIUS' start arranged in a circle and rotate inward to form the word horizontally when the container reaches viewport center (100% at center)."
      >
        <CircularAssemblyMorbius />
      </AnimationCard>

      {/* Morbius 12: Typewriter Effect */}
      <AnimationCard
        title="12. Typewriter Cursor Effect"
        prompt="Simulate a typewriter effect where letters of 'MORBIUS' appear sequentially with a blinking cursor that moves along, completing at viewport center."
      >
        <TypewriterMorbius />
      </AnimationCard>

      {/* Morbius 13: Elastic Bounce */}
      <AnimationCard
        title="13. Elastic Bounce In"
        prompt="Each letter of 'MORBIUS' bounces in from below with elastic easing, overshooting then settling into final position. Animation completes when container is centered in viewport."
      >
        <ElasticBounceMorbius />
      </AnimationCard>

      {/* Morbius 14: Mirror Flip */}
      <AnimationCard
        title="14. Mirror Flip Assembly"
        prompt="Letters start mirrored/flipped and rotate 180 degrees on Y-axis to reveal correct orientation. Progress from 0 to 100% as element moves to viewport center."
      >
        <MirrorFlipMorbius />
      </AnimationCard>

      {/* Morbius 15: Glitch Effect */}
      <AnimationCard
        title="15. Digital Glitch Reveal"
        prompt="Letters of 'MORBIUS' glitch into position with RGB offset and random position shifts that stabilize at viewport center (glitch reduces from 100% to 0%)."
      >
        <GlitchRevealMorbius />
      </AnimationCard>

      {/* Morbius 16: Explode to Center */}
      <AnimationCard
        title="16. Explosive Center Formation"
        prompt="Letters explode outward from center then reverse and settle into 'MORBIUS' formation. Full assembly at viewport center with scale and rotation transforms."
      >
        <ExplodeCenterMorbius />
      </AnimationCard>

      {/* Morbius 17: Liquid Morph */}
      <AnimationCard
        title="17. Liquid Drip Formation"
        prompt="Letters appear to drip down from top like liquid, stretching vertically then snapping into place. Each letter drips at different speeds, all settled at viewport center."
      >
        <LiquidDripMorbius />
      </AnimationCard>

      {/* Morbius 18: Origami Unfold */}
      <AnimationCard
        title="18. Origami Paper Unfold"
        prompt="Letters start as flat folded paper (rotated 90deg on X-axis) and unfold to reveal 'MORBIUS'. Full unfold completes when container is at viewport center."
      >
        <OrigamiUnfoldMorbius />
      </AnimationCard>

      {/* Morbius 19: Neon Flicker */}
      <AnimationCard
        title="19. Neon Sign Flicker On"
        prompt="Letters of 'MORBIUS' flicker like neon signs turning on, with random brightness pulses that stabilize to full glow at viewport center. Include text-shadow glow effects."
      >
        <NeonFlickerMorbius />
      </AnimationCard>

      {/* Morbius 20: DNA Helix Spin */}
      <AnimationCard
        title="20. DNA Helix Spiral Formation"
        prompt="Letters spiral in a DNA helix pattern, rotating around a central axis while moving into final positions. Helix completes and straightens into 'MORBIUS' at viewport center."
      >
        <DNAHelixMorbius />
      </AnimationCard>

      {/* Morbius 21: Professional Fade Scale */}
      <AnimationCard
        title="21. Professional Fade & Scale"
        prompt="Letters of 'MORBIUS' fade in with smooth scale animation and letter-spacing reduction, using professional easing. Animation completes and holds at viewport center with no further movement."
      >
        <ProfessionalFadeScaleMorbius />
      </AnimationCard>

      {/* Morbius 22: Elegant Slide In */}
      <AnimationCard
        title="22. Elegant Horizontal Slide"
        prompt="Each letter slides in horizontally from alternating sides with smooth cubic-bezier easing and slight opacity fade. Completes at center with perfect alignment and stops."
      >
        <ElegantSlideMorbius />
      </AnimationCard>

      {/* Morbius 23: Vertical Mask Reveal */}
      <AnimationCard
        title="23. Vertical Mask Reveal"
        prompt="Letters revealed by a smooth vertical mask that wipes from top to bottom, with subtle shadow effect. Mask disappears completely at viewport center, leaving clean text."
      >
        <VerticalMaskRevealMorbius />
      </AnimationCard>

      {/* Morbius 24: Sophisticated Depth Rotation */}
      <AnimationCard
        title="24. Sophisticated 3D Rotation"
        prompt="Letters rotate from 90° perspective into view with depth and subtle scale. Uses smooth easing to settle into final position at center with no oscillation."
      >
        <SophisticatedRotationMorbius />
      </AnimationCard>

      {/* Morbius 25: Minimal Stagger Fade */}
      <AnimationCard
        title="25. Minimal Stagger Fade In"
        prompt="Clean, minimal animation where letters fade in sequentially with subtle upward drift. Professional timing with smooth deceleration. Holds static once complete."
      >
        <MinimalStaggerMorbius />
      </AnimationCard>

      {/* Morbius 26: Center Expand */}
      <AnimationCard
        title="26. Center Expand Elegance"
        prompt="Word starts as a point in center and elegantly expands outward with letters scaling and spacing smoothly. Reaches final size at viewport center and stops gracefully."
      >
        <CenterExpandMorbius />
      </AnimationCard>

      {/* Morbius 27: Letter Spacing Morph */}
      <AnimationCard
        title="27. Professional Letter Spacing"
        prompt="Letters start condensed and smoothly expand to optimal spacing with simultaneous opacity fade-in. Uses professional typography timing and stops at perfect spacing."
      >
        <LetterSpacingMorbius />
      </AnimationCard>

      {/* Morbius 28: Shadow Lift Reveal */}
      <AnimationCard
        title="28. Shadow & Lift Reveal"
        prompt="Letters rise from below with growing drop shadow that fades as they settle. Professional lift animation with smooth shadow transition. Completes with no shadow at center."
      >
        <ShadowLiftMorbius />
      </AnimationCard>

      {/* Morbius 29: Opacity Gradient Wave */}
      <AnimationCard
        title="29. Elegant Opacity Wave"
        prompt="Smooth opacity wave passes through letters from left to right with gradient timing. Professional fade curve with letters settling to full opacity. Holds static when complete."
      >
        <OpacityWaveMorbius />
      </AnimationCard>

      {/* Morbius 30: Refined Cascade */}
      <AnimationCard
        title="30. Refined Cascade Effect"
        prompt="Letters cascade into position with refined timing and subtle rotation. Each letter follows smooth bezier curve settling into alignment. Animation stops cleanly at viewport center."
      >
        <RefinedCascadeMorbius />
      </AnimationCard>
    </div>
  );
}

// Wrapper component for each animation
function AnimationCard({
  title,
  prompt,
  children,
}: {
  title: string;
  prompt: string;
  children: React.ReactNode;
}) {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="rounded-lg border border-gray-700 bg-[#1a1d2e] p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="rounded bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
        >
          {showPrompt ? "Hide Prompt" : "Show Prompt"}
        </button>
      </div>
      {showPrompt && (
        <div className="mb-6 rounded-lg bg-gray-900 p-4">
          <p className="text-sm text-emerald-400 font-mono leading-relaxed">{prompt}</p>
        </div>
      )}
      <div className="rounded-lg bg-[#0f1117] p-8 min-h-[400px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ========== NEW ANIMATIONS ==========

// Animation 1: Classic Parallax Layers
function ParallaxLayers() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div
        className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-purple-500/20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        BACKGROUND
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-500/40"
        style={{ transform: `translateY(${scrollY * 0.6}px)` }}
      >
        MIDDLE
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-emerald-500"
        style={{ transform: `translateY(${scrollY * 1}px)` }}
      >
        FOREGROUND
      </div>
    </div>
  );
}

// Animation 2: 3D Tilt Card
function TiltCard() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-80 h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: `${rotation.y * 2}px ${rotation.x * 2}px 40px rgba(0,0,0,0.3)`,
        }}
      >
        Hover Me
      </div>
    </div>
  );
}

// Animation 3: Infinite Marquee
function InfiniteMarquee() {
  const text = "✨ INFINITE SCROLLING TEXT • SEAMLESS LOOP • ";
  const repeatedText = text.repeat(10);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-4xl font-bold text-yellow-400">{repeatedText}</span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Animation 4: Particle Trail
function ParticleTrail() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle = { id: particleIdRef.current++, x, y };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full cursor-crosshair bg-gray-900/50 rounded-lg"
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xl">
        Move your mouse here
      </div>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-particle pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Animation 5: Morphing Blob
function MorphingBlob() {
  return (
    <svg width="300" height="300" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="100%" stopColor="#00ffff" />
        </linearGradient>
      </defs>
      <path fill="url(#blob-gradient)" className="animate-blob">
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="
            M40,60 Q60,20 80,40 T120,60 Q140,80 120,100 T80,120 Q60,140 40,120 T40,60;
            M50,50 Q70,30 90,50 T130,70 Q150,90 130,110 T90,130 Q70,150 50,130 T50,50;
            M45,55 Q65,25 85,45 T125,65 Q145,85 125,105 T85,125 Q65,145 45,125 T45,55;
            M40,60 Q60,20 80,40 T120,60 Q140,80 120,100 T80,120 Q60,140 40,120 T40,60;
          "
        />
      </path>
    </svg>
  );
}

// Animation 6: Stagger Fade In
function StaggerFadeIn() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={`h-24 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

// Animation 7: Rotating Cube
function RotatingCube() {
  return (
    <div className="w-64 h-64" style={{ perspective: "800px" }}>
      <div className="w-full h-full relative animate-rotate-3d" style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute w-full h-full bg-red-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateY(0deg) translateZ(128px)" }}>Front</div>
        <div className="absolute w-full h-full bg-blue-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateY(180deg) translateZ(128px)" }}>Back</div>
        <div className="absolute w-full h-full bg-green-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateY(90deg) translateZ(128px)" }}>Right</div>
        <div className="absolute w-full h-full bg-yellow-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateY(-90deg) translateZ(128px)" }}>Left</div>
        <div className="absolute w-full h-full bg-purple-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateX(90deg) translateZ(128px)" }}>Top</div>
        <div className="absolute w-full h-full bg-pink-500/80 flex items-center justify-center text-white font-bold text-2xl" style={{ transform: "rotateX(-90deg) translateZ(128px)" }}>Bottom</div>
      </div>
      <style jsx>{`
        @keyframes rotate-3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        .animate-rotate-3d {
          animation: rotate-3d 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Animation 8: Ripple Effect
function RippleEffect() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: rippleIdRef.current++, x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full h-full cursor-pointer bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg flex items-center justify-center"
    >
      <span className="text-white text-xl z-10">Click Anywhere</span>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border-4 border-white animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            margin-left: 0;
            margin-top: 0;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            margin-left: -150px;
            margin-top: -150px;
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Animation 9: Text Reveal
function TextReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <h2 className="text-6xl font-bold text-white">
        REVEALED TEXT
      </h2>
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-transform duration-2000 ${
          isVisible ? "translate-x-full" : "-translate-x-full"
        }`}
        style={{ width: "100%" }}
      />
    </div>
  );
}

// Animation 10: Floating Elements
function FloatingElements() {
  const elements = [
    { size: 60, color: "bg-red-500", delay: 0, speed: 3 },
    { size: 80, color: "bg-blue-500", delay: 0.5, speed: 4 },
    { size: 50, color: "bg-green-500", delay: 1, speed: 2.5 },
    { size: 70, color: "bg-yellow-500", delay: 1.5, speed: 3.5 },
    { size: 90, color: "bg-purple-500", delay: 2, speed: 5 },
    { size: 55, color: "bg-pink-500", delay: 2.5, speed: 2.8 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-8">
      {elements.map((el, i) => (
        <div
          key={i}
          className={`${el.color} rounded-full animate-float`}
          style={{
            width: el.size,
            height: el.size,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.speed}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ========== PARALLAX SCROLLING ANIMATIONS ==========

// Parallax 1: Horizontal Slide
function HorizontalParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex flex-col gap-8 justify-center">
      <div
        className="h-20 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold"
        style={{ transform: `translateX(${scrollY * -0.5}px)` }}
      >
        Slide Left Fast
      </div>
      <div
        className="h-20 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold"
        style={{ transform: `translateX(${scrollY * 0.3}px)` }}
      >
        Slide Right Slow
      </div>
      <div
        className="h-20 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold"
        style={{ transform: `translateX(${scrollY * -0.8}px)` }}
      >
        Slide Left Super Fast
      </div>
    </div>
  );
}

// Parallax 2: Zoom Scale
function ZoomParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundScale = 1 + scrollY * 0.001;
  const foregroundScale = 1 - scrollY * 0.0005;

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `scale(${backgroundScale})` }}
      >
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
          Zoom In
        </div>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `scale(${Math.max(0.5, foregroundScale)})` }}
      >
        <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
          Zoom Out
        </div>
      </div>
    </div>
  );
}

// Parallax 3: Opacity Fade
function OpacityParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity1 = Math.max(0, 1 - scrollY * 0.002);
  const opacity2 = Math.min(1, scrollY * 0.003);
  const opacity3 = Math.abs(Math.sin(scrollY * 0.01));

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div
        className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-red-500"
        style={{ opacity: opacity1 }}
      >
        FADE OUT
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-500"
        style={{ opacity: opacity2 }}
      >
        FADE IN
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-green-500"
        style={{ opacity: opacity3 }}
      >
        PULSE
      </div>
    </div>
  );
}

// Parallax 4: Rotation Parallax
function RotationParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-around">
      <div
        className="w-24 h-24 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
        style={{ transform: `rotateZ(${scrollY * 0.5}deg)` }}
      >
        Z
      </div>
      <div
        className="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
        style={{ transform: `rotateY(${scrollY * 0.3}deg)`, transformStyle: "preserve-3d" }}
      >
        Y
      </div>
      <div
        className="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
        style={{ transform: `rotateX(${scrollY * 0.4}deg)`, transformStyle: "preserve-3d" }}
      >
        X
      </div>
    </div>
  );
}

// Parallax 5: Diagonal Movement
function DiagonalParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div
        className="absolute w-20 h-20 bg-purple-500 rounded-full"
        style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)` }}
      />
      <div
        className="absolute w-20 h-20 bg-pink-500 rounded-full right-0"
        style={{ transform: `translate(${scrollY * -0.4}px, ${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute w-20 h-20 bg-yellow-500 rounded-full bottom-0"
        style={{ transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.3}px)` }}
      />
      <div
        className="absolute w-20 h-20 bg-cyan-500 rounded-full right-0 bottom-0"
        style={{ transform: `translate(${scrollY * -0.3}px, ${scrollY * -0.2}px)` }}
      />
    </div>
  );
}

// Parallax 6: Blur Depth
function BlurParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blur1 = Math.min(10, scrollY * 0.02);
  const blur2 = Math.min(5, scrollY * 0.01);

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div
        className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-purple-500/50"
        style={{ filter: `blur(${blur1}px)` }}
      >
        BACKGROUND
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-500/70"
        style={{ filter: `blur(${blur2}px)` }}
      >
        MIDDLE
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-emerald-500">
        SHARP
      </div>
    </div>
  );
}

// Parallax 7: Color Shift
function ColorShiftParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hue1 = (scrollY * 0.5) % 360;
  const hue2 = (scrollY * 0.3) % 360;
  const hue3 = (scrollY * 0.7) % 360;

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex flex-col gap-6 justify-center">
      <div
        className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
        style={{ backgroundColor: `hsl(${hue1}, 70%, 50%)` }}
      >
        Color Shift Fast
      </div>
      <div
        className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
        style={{ backgroundColor: `hsl(${hue2}, 70%, 50%)` }}
      >
        Color Shift Medium
      </div>
      <div
        className="h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
        style={{ backgroundColor: `hsl(${hue3}, 70%, 50%)` }}
      >
        Color Shift Slow
      </div>
    </div>
  );
}

// Parallax 8: Split Screen
function SplitScreenParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex">
      <div className="w-1/2 relative overflow-hidden border-r-2 border-white">
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-red-500"
          style={{ transform: `translateY(${scrollY * -0.5}px)` }}
        >
          ↑ UP
        </div>
      </div>
      <div className="w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-blue-500"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          ↓ DOWN
        </div>
      </div>
    </div>
  );
}

// Parallax 9: Spiral Inward
function SpiralParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const elements = 8;

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(elements)].map((_, i) => {
          const angle = (i / elements) * Math.PI * 2;
          const radius = 150 - scrollY * 0.2 * (i + 1);
          const rotation = scrollY * 0.5;
          const x = Math.cos(angle + rotation * 0.01) * Math.max(0, radius);
          const y = Math.sin(angle + rotation * 0.01) * Math.max(0, radius);

          return (
            <div
              key={i}
              className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                backgroundColor: `hsl(${i * (360 / elements)}, 70%, 50%)`,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Parallax 10: Wave Pattern
function WaveParallax() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bars = 10;

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex flex-col gap-2 justify-center">
      {[...Array(bars)].map((_, i) => {
        const wave = Math.sin((scrollY * 0.01) + (i * 0.5)) * 50;
        const hue = (i * 36) % 360;

        return (
          <div
            key={i}
            className="h-8 rounded-lg"
            style={{
              transform: `translateX(${wave}px)`,
              backgroundColor: `hsl(${hue}, 70%, 50%)`,
            }}
          />
        );
      })}
    </div>
  );
}

// ========== MORBIUS SPELLING ANIMATIONS ==========

// Morbius 1: Letter by Letter Reveal
function LetterRevealMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-4">
      {letters.map((letter, i) => {
        const threshold = i * 50;
        const opacity = Math.min(1, Math.max(0, (scrollY - threshold) / 50));
        const translateY = Math.max(0, 50 - (scrollY - threshold));

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 2: Depth Layers
function DepthLayersMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {letters.map((letter, i) => {
        const speed = 0.2 + (i * 0.12);
        const size = 96 - (i * 6);
        const opacity = 0.3 + (i * 0.1);

        return (
          <div
            key={i}
            className="absolute font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontSize: `${size}px`,
              transform: `translateY(${scrollY * speed}px)`,
              opacity,
              left: `${10 + i * 12}%`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 3: Split and Merge
function SplitMergeMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-2">
      {letters.map((letter, i) => {
        const progress = Math.min(1, scrollY / 200);
        const startX = (i - 3) * 100;
        const startY = (i % 2 === 0 ? -1 : 1) * 150;
        const currentX = startX * (1 - progress);
        const currentY = startY * (1 - progress);

        return (
          <div
            key={i}
            className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translate(${currentX}px, ${currentY}px)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 4: Rotating Letters
function RotatingLettersMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-4">
      {letters.map((letter, i) => {
        const rotateX = scrollY * (0.3 + i * 0.1);
        const rotateY = scrollY * (0.2 + i * 0.15);
        const rotateZ = scrollY * (0.4 - i * 0.05);

        return (
          <div
            key={i}
            className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 5: Wave Motion
function WaveMotionMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-4">
      {letters.map((letter, i) => {
        const wave = Math.sin((scrollY * 0.02) + (i * 0.8)) * 40;

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translateY(${wave}px)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 6: Color Gradient Shift
function ColorGradientMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const hue = (scrollY * (0.5 + i * 0.2) + i * 40) % 360;

        return (
          <div
            key={i}
            className="text-7xl font-bold"
            style={{
              color: `hsl(${hue}, 80%, 60%)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 7: Scale Size
function ScaleSizeMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-2">
      {letters.map((letter, i) => {
        const baseScale = 1 + Math.sin((scrollY * 0.01) + (i * 0.5)) * 0.5;
        const scale = i % 2 === 0 ? baseScale : 2 - baseScale;

        return (
          <div
            key={i}
            className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 8: Stagger Slide
function StaggerSlideMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");
  const directions = [
    { x: 0, y: -200 },
    { x: 200, y: 0 },
    { x: 0, y: 200 },
    { x: -200, y: 0 },
    { x: 200, y: -200 },
    { x: -200, y: 200 },
    { x: 200, y: 200 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const progress = Math.min(1, Math.max(0, (scrollY - i * 30) / 100));
        const dir = directions[i];
        const currentX = dir.x * (1 - progress);
        const currentY = dir.y * (1 - progress);

        return (
          <div
            key={i}
            className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translate(${currentX}px, ${currentY}px)`,
              opacity: progress,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 9: 3D Perspective
function Perspective3DMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center gap-4"
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, i) => {
        const translateZ = (scrollY * 0.5 - i * 20);

        return (
          <div
            key={i}
            className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translateZ(${translateZ}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 10: Blur to Focus
function BlurFocusMorbius() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = "MORBIUS".split("");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const progress = Math.min(1, Math.max(0, (scrollY - i * 40) / 80));
        const blur = Math.max(0, 20 * (1 - progress));
        const offsetX = (i - 3) * 30 * (1 - progress);
        const offsetY = (i % 2 === 0 ? 50 : -50) * (1 - progress);

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              filter: `blur(${blur}px)`,
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              opacity: progress,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// ========== NEW MORBIUS ANIMATIONS (11-20) - Centered at Viewport ==========

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

// Morbius 11: Circular Assembly
function CircularAssemblyMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {letters.map((letter, i) => {
        const angle = (i / letters.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 150 * (1 - progress);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const finalX = (i - 3) * 80 * progress;

        return (
          <div
            key={i}
            className="absolute text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translate(${x + finalX}px, ${y}px) rotate(${360 * (1 - progress)}deg)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 12: Typewriter Effect
function TypewriterMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-1">
      {letters.map((letter, i) => {
        const letterProgress = Math.max(0, Math.min(1, (progress * letters.length - i) / 1));

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: letterProgress,
              transform: `scaleY(${letterProgress})`,
            }}
          >
            {letter}
          </div>
        );
      })}
      {progress < 1 && (
        <div
          className="w-1 h-20 bg-blue-500 animate-pulse"
          style={{ opacity: progress }}
        />
      )}
    </div>
  );
}

// Morbius 13: Elastic Bounce
function ElasticBounceMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const delay = i * 0.1;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const elasticProgress = adjustedProgress < 1
          ? adjustedProgress * (1 + 0.3 * Math.sin(adjustedProgress * Math.PI * 3))
          : 1;
        const translateY = 200 * (1 - elasticProgress);

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translateY(${translateY}px) scaleY(${1 - (1 - elasticProgress) * 0.5})`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 14: Mirror Flip
function MirrorFlipMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const rotation = 180 * (1 - progress);

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 15: Glitch Effect
function GlitchRevealMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const glitchAmount = 20 * (1 - progress);
        const randomX = Math.sin(i * 1000 + progress * 50) * glitchAmount;
        const randomY = Math.cos(i * 1500 + progress * 50) * glitchAmount;
        const rgbOffset = 5 * (1 - progress);

        return (
          <div key={i} className="relative">
            <div
              className="absolute text-7xl font-bold text-red-500"
              style={{
                transform: `translate(${randomX - rgbOffset}px, ${randomY}px)`,
                opacity: 0.7 * (1 - progress),
              }}
            >
              {letter}
            </div>
            <div
              className="absolute text-7xl font-bold text-blue-500"
              style={{
                transform: `translate(${randomX + rgbOffset}px, ${randomY}px)`,
                opacity: 0.7 * (1 - progress),
              }}
            >
              {letter}
            </div>
            <div
              className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
              style={{
                transform: `translate(${randomX}px, ${randomY}px)`,
              }}
            >
              {letter}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Morbius 16: Explode to Center
function ExplodeCenterMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const explosionProgress = progress < 0.5 ? progress * 2 : 1;
        const assemblyProgress = progress > 0.5 ? (progress - 0.5) * 2 : 0;
        const angle = (i / letters.length) * Math.PI * 2;
        const explosionDistance = 300 * (1 - explosionProgress);
        const x = Math.cos(angle) * explosionDistance * (1 - assemblyProgress);
        const y = Math.sin(angle) * explosionDistance * (1 - assemblyProgress);
        const scale = 0.5 + 0.5 * progress;
        const rotation = 360 * (1 - progress);

        return (
          <div
            key={i}
            className="absolute text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translate(${x + (i - 3) * 80 * assemblyProgress}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 17: Liquid Drip
function LiquidDripMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const dripDelay = i * 0.12;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - dripDelay) / (1 - dripDelay)));
        const dripProgress = adjustedProgress < 0.7 ? adjustedProgress / 0.7 : 1;
        const snapProgress = adjustedProgress > 0.7 ? (adjustedProgress - 0.7) / 0.3 : 0;
        const stretchY = dripProgress < 1 ? 1 + (1 - dripProgress) * 2 : 1;
        const translateY = -200 * (1 - dripProgress);
        const finalY = translateY + 50 * (1 - snapProgress) * Math.sin(snapProgress * Math.PI);

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent origin-top"
            style={{
              transform: `translateY(${finalY}px) scaleY(${stretchY})`,
              opacity: adjustedProgress,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 18: Origami Unfold
function OrigamiUnfoldMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center gap-3"
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, i) => {
        const unfoldRotation = 90 * (1 - progress);
        const slideIn = 100 * (1 - progress) * (i % 2 === 0 ? -1 : 1);

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `rotateX(${unfoldRotation}deg) translateX(${slideIn}px)`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 19: Neon Flicker
function NeonFlickerMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const flicker = progress < 0.8
          ? Math.random() > (progress + i * 0.1) / 1.2 ? 0.3 : 1
          : 1;
        const glow = 20 * progress;

        return (
          <div
            key={i}
            className="text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: flicker,
              textShadow: `0 0 ${glow}px rgba(139, 92, 246, ${progress}), 0 0 ${glow * 2}px rgba(59, 130, 246, ${progress * 0.5})`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 20: DNA Helix Spin
function DNAHelixMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {letters.map((letter, i) => {
        const helixProgress = 1 - progress;
        const angle = (i / letters.length) * Math.PI * 4 * helixProgress;
        const radius = 100 * helixProgress;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (i - 3) * 30 * helixProgress;
        const finalX = (i - 3) * 80 * progress;
        const rotation = angle * (180 / Math.PI) * helixProgress;

        return (
          <div
            key={i}
            className="absolute text-7xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translate3d(${x + finalX}px, ${y}px, ${z}px) rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// ========== ELEGANT PROFESSIONAL ANIMATIONS (21-30) ==========

// Professional easing function
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Morbius 21: Professional Fade Scale
function ProfessionalFadeScaleMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {letters.map((letter, i) => {
        const easedProgress = easeOutCubic(progress);
        const letterSpacing = 20 * (1 - easedProgress);
        const scale = 0.8 + 0.2 * easedProgress;

        return (
          <div
            key={i}
            className="text-8xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `scale(${scale})`,
              marginLeft: i === 0 ? 0 : `${letterSpacing}px`,
              transition: progress === 1 ? 'none' : 'all 0.1s ease-out',
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 22: Elegant Slide In
function ElegantSlideMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-2">
      {letters.map((letter, i) => {
        const delay = i * 0.08;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const easedProgress = easeInOutCubic(adjustedProgress);
        const slideDistance = 150 * (i % 2 === 0 ? -1 : 1);
        const translateX = slideDistance * (1 - easedProgress);

        return (
          <div
            key={i}
            className="text-8xl font-light tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 23: Vertical Mask Reveal
function VerticalMaskRevealMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <div className="flex gap-2">
        {letters.map((letter, i) => (
          <div
            key={i}
            className="relative text-8xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            {letter}
            <div
              className="absolute inset-0 bg-[#0f1117]"
              style={{
                transform: `translateY(${-100 * easeOutCubic(progress)}%)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Morbius 24: Sophisticated Depth Rotation
function SophisticatedRotationMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center gap-3"
      style={{ perspective: "1200px" }}
    >
      {letters.map((letter, i) => {
        const delay = i * 0.06;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const easedProgress = easeOutCubic(adjustedProgress);
        const rotateX = 90 * (1 - easedProgress);
        const scale = 0.5 + 0.5 * easedProgress;

        return (
          <div
            key={i}
            className="text-7xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `rotateX(${rotateX}deg) scale(${scale})`,
              transformStyle: "preserve-3d",
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 25: Minimal Stagger Fade
function MinimalStaggerMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const delay = i * 0.1;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const easedProgress = easeOutCubic(adjustedProgress);
        const translateY = 30 * (1 - easedProgress);

        return (
          <div
            key={i}
            className="text-8xl font-extralight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `translateY(${translateY}px)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 26: Center Expand
function CenterExpandMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {letters.map((letter, i) => {
        const easedProgress = easeInOutCubic(progress);
        const finalPosition = (i - 3) * 85;
        const currentX = finalPosition * easedProgress;
        const scale = 0.3 + 0.7 * easedProgress;

        return (
          <div
            key={i}
            className="absolute text-8xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              transform: `translateX(${currentX}px) scale(${scale})`,
              opacity: easedProgress,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 27: Letter Spacing Morph
function LetterSpacingMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      <div className="flex" style={{ letterSpacing: `${40 * (1 - easeOutCubic(progress))}px` }}>
        {letters.map((letter, i) => (
          <div
            key={i}
            className="text-8xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easeOutCubic(progress),
            }}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

// Morbius 28: Shadow Lift Reveal
function ShadowLiftMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const delay = i * 0.07;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const easedProgress = easeOutCubic(adjustedProgress);
        const translateY = 60 * (1 - easedProgress);
        const shadowBlur = 40 * (1 - easedProgress);
        const shadowY = 30 * (1 - easedProgress);

        return (
          <div
            key={i}
            className="text-7xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `translateY(${translateY}px)`,
              filter: `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${0.4 * (1 - easedProgress)}))`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 29: Opacity Gradient Wave
function OpacityWaveMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-3">
      {letters.map((letter, i) => {
        const waveDelay = i * 0.15;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - waveDelay) / (1 - waveDelay)));
        const easedProgress = easeInOutCubic(adjustedProgress);

        return (
          <div
            key={i}
            className="text-8xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

// Morbius 30: Refined Cascade
function RefinedCascadeMorbius() {
  const { progress, containerRef } = useViewportCenterProgress();
  const letters = "MORBIUS".split("");

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center gap-2">
      {letters.map((letter, i) => {
        const delay = i * 0.08;
        const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
        const easedProgress = easeOutCubic(adjustedProgress);
        const translateY = 80 * (1 - easedProgress);
        const rotation = 15 * (1 - easedProgress) * (i % 2 === 0 ? 1 : -1);

        return (
          <div
            key={i}
            className="text-7xl font-light bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              opacity: easedProgress,
              transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
