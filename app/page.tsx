"use client";

import { useState } from "react";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import MorbiusDescriptionSection from "./components/MorbiusDescriptionSection";
import ProveXMysterySection from "./components/ProveXMysterySection";
import JoinDiscussionSection from "./components/JoinDiscussionSection";
import StatsSection from "./components/StatsSection";
import ProofSection from "./components/ProofSection";
import MoreSection from "./components/MoreSection";
import BuyNowSection from "./components/BuyNowSection";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSwitchClick = () => {
    const buyNowSection = document.getElementById("buy-now");
    if (buyNowSection) {
      buyNowSection.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <main className="bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 border-b border-white/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center px-3 md:px-6 py-2 md:py-4 gap-2 md:gap-0">
          <div className="flex items-center justify-between w-full md:w-auto md:flex-1 md:justify-start gap-3">
            <div className="flex items-center">
              <Image
                src="/logo_converted.png"
                alt="Morbius logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </div>
          </div>

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

          <div className="flex items-center gap-3 flex-1 justify-end relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h12M4 17h16" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-black/90 backdrop-blur-lg shadow-xl">
                <button
                  onClick={handleSwitchClick}
                  className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 rounded-t-xl"
                >
                  Switch
                </button>
                <a
                  href="https://t.me/morbius_cash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Telegram
                </a>
                <a
                  href="https://pump.tires/token/0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-b-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  PUMP
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <HeroSection />
      <MorbiusDescriptionSection />
      <ProveXMysterySection />
      <JoinDiscussionSection />
      <ProofSection />
      <StatsSection />
      <MoreSection />
      <BuyNowSection />
    </main>
  );
}
