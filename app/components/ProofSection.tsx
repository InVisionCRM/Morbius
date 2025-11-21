"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROOF_ITEMS = [
  {
    src: "/vitals.png",
    title: "This is the original name of ProveX",
    subtitle: "(Found in ProveX.info web code)",
  },
  {
    src: "/recentsacs.png",
    title: "This has a deeper meaning though....",
    subtitle: "",
  },
  {
    src: "/fullsacpage.png",
    title: "Why did the name change last minute?....",
    subtitle: "",
  },
  {
    src: "/sacproof.png",
    title: "Follow the top sacrifice wallet and find the truth!",
    subtitle: "",
  },
];

function useSectionProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const value = Math.min(Math.max(current / total, 0), 1);
      setProgress(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

export default function ProofSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rawProgress = useSectionProgress(sectionRef);

  const totalItems = PROOF_ITEMS.length;
  const totalStages = totalItems + 1;
  const START_THRESHOLD = 0.2;
  const progress = Math.min(
    Math.max((rawProgress - START_THRESHOLD) / (1 - START_THRESHOLD), 0),
    1
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) {
      video.pause();
    } else {
      const handleLoaded = () => video.pause();
      video.addEventListener("loadedmetadata", handleLoaded, { once: true });
      return () => video.removeEventListener("loadedmetadata", handleLoaded);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    video.currentTime = progress * video.duration;
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${totalStages * 110}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <video
          ref={videoRef}
          src="/Web ui/morbius.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

        <div className="relative w-full max-w-5xl h-[60vh]">
          {PROOF_ITEMS.map((item, index) => {
            const itemProgress = Math.min(Math.max(progress * totalStages - index, 0), 1);
            const fade =
              itemProgress <= 0
                ? 0
                : itemProgress >= 1
                ? 0
                : itemProgress <= 0.5
                ? itemProgress * 2
                : (1 - itemProgress) * 2;
            const translateY = (1 - Math.min(itemProgress, 1)) * 40;

            return (
              <article
                key={item.src}
                className="absolute inset-0 flex flex-col md:flex-row gap-6 bg-black/70 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  opacity: fade,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <div className="relative flex-1">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3 p-6">
                  <p className="text-sm text-purple-300 tracking-[0.4em]">EXHIBIT {index + 1}</p>
                  <h3 className="text-2xl font-bold leading-snug">
                    {index === 0 ? (
                      <>
                        {item.title}
                        <br />
                        <a
                          href="https://staging.morbius.cash"
                          className="underline text-purple-200 hover:text-purple-100 text-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Morbius Sacrifice site
                        </a>
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>
                  {item.subtitle && <p className="text-gray-400">{item.subtitle}</p>}
                  {index === PROOF_ITEMS.length - 1 && (
                    <a
                      href="https://scan.mypinata.cloud/ipfs/bafybeienxyoyrhn5tswclvd3gdjy5mtkkwmu37aqtml6onbf7xnb3o22pe/#/address/0x2Ea1870234B3A9a152594D1F40df29F71F837205?page=3&next_page_params=%7B%22block_number%22%3A24152003%2C%22fee%22%3A%22185546355370032191292%22%2C%22hash%22%3A%220x058fc7d848a3066fd453d14b1ee2ca043e8cd88bda82a0973a3fd852d3a5ea94%22%2C%22index%22%3A15%2C%22inserted_at%22%3A%222025-08-04T03%3A47%3A22.750417Z%22%2C%22items_count%22%3A100%2C%22value%22%3A%220%22%7D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-mono"
                    >
                      0x2Ea1870234B3A9a152594D1F40df29F71F837205
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18v4.5M6 18l12-12" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}
