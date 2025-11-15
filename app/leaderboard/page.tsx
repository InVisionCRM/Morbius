"use client";

import { useState } from "react";
import Image from "next/image";

interface LeaderboardEntry {
  rank: number;
  multiplier: string;
  points: number;
  usdValue: number;
  count: number;
  address: string;
  tokens: string[];
  additionalTokens?: number;
}

const mockData: LeaderboardEntry[] = [
  {
    rank: 1,
    multiplier: "2.1279x",
    points: 970797.23,
    usdValue: 45.62,
    count: 29,
    address: "0x2ea1870234b3a9a152594d1f40df29f71f837205",
    tokens: ["ethereum", "binance", "polygon"],
    additionalTokens: 11,
  },
  {
    rank: 2,
    multiplier: "1.1804x",
    points: 46533.30,
    usdValue: 3.94,
    count: 3,
    address: "0x1878c1f92d9a7f7d7668635cc379ff0d97abdaa9",
    tokens: ["binance"],
  },
  {
    rank: 3,
    multiplier: "1.0727x",
    points: 18176.00,
    usdValue: 1.69,
    count: 2,
    address: "0xf13e096a461968046300fa8acf5550a288ec127df",
    tokens: ["tron"],
  },
  {
    rank: 4,
    multiplier: "1.0201x",
    points: 10772.33,
    usdValue: 1.05,
    count: 1,
    address: "0x894e6502b0bff8c485347990e0e35536357ba8cad5",
    tokens: ["tron"],
  },
  {
    rank: 5,
    multiplier: "1.0000x",
    points: 0.03,
    usdValue: 0.00,
    count: 1,
    address: "0xcc00b55cb9e85675ab9c5e153e7ba9f21ff1603e",
    tokens: ["tron"],
  },
  {
    rank: 6,
    multiplier: "1.0000x",
    points: 0.00,
    usdValue: 0.00,
    count: 1,
    address: "0x72791c03306d99e3ea878fb54026a459b8fd8fbf",
    tokens: ["tron"],
  },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"recent" | "leaderboard">("leaderboard");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / perPage);

  return (
    <main className="flex-1 bg-[#0f1117]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-white">Points & Sacrifices</h1>

          {/* Tabs */}
          <div className="ml-6 flex gap-2">
            <button
              onClick={() => setActiveTab("recent")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "recent"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg bg-[#1a1d2e]">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_100px_180px_120px_80px_1fr] gap-4 border-b border-gray-700 bg-[#252837] px-6 py-4 text-sm font-medium text-gray-300">
            <div className="text-sky-400">Rank</div>
            <div></div>
            <div className="text-white">Points</div>
            <div className="text-white">USD Value</div>
            <div className="text-white">Count</div>
            <div className="text-white">Address</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700">
            {mockData.map((entry) => (
              <div
                key={entry.rank}
                className="grid grid-cols-[80px_100px_180px_120px_80px_1fr] gap-4 px-6 py-4 hover:bg-gray-800/30 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center gap-2 text-white">
                  <button className="text-gray-500 hover:text-gray-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="3" cy="10" r="1.5" />
                      <circle cx="10" cy="10" r="1.5" />
                      <circle cx="17" cy="10" r="1.5" />
                    </svg>
                  </button>
                  <span className="font-medium">{entry.rank}</span>
                  {entry.rank <= 3 && (
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>

                {/* Multiplier */}
                <div className="flex items-center">
                  <span className="rounded border border-emerald-600 bg-emerald-950/30 px-2 py-1 text-xs font-mono text-emerald-400">
                    {entry.multiplier}
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-center text-2xl font-bold text-blue-400">
                  {entry.points.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                {/* USD Value */}
                <div className="flex items-center text-lg font-medium text-emerald-400">
                  ${entry.usdValue.toFixed(2)}
                </div>

                {/* Count */}
                <div className="flex items-center text-gray-400">
                  {entry.count}
                </div>

                {/* Address */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-300">
                    {entry.address}
                  </span>
                  <div className="flex items-center gap-1">
                    {entry.tokens.map((token, idx) => (
                      <div
                        key={idx}
                        className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
                        title={token}
                      />
                    ))}
                    {entry.additionalTokens && (
                      <span className="text-xs text-gray-500">+{entry.additionalTokens}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-400">per page</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{mockData.length} total</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="rounded p-2 text-gray-400 hover:bg-gray-700 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded p-2 text-gray-400 hover:bg-gray-700 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="rounded bg-gray-700 px-3 py-1 text-sm text-white">{currentPage}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{totalPages}</span>
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded p-2 text-gray-400 hover:bg-gray-700 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded p-2 text-gray-400 hover:bg-gray-700 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-3 rounded-lg bg-gray-800/30 p-4">
          <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-400">
            Prices may be manually changed, sacrifices and tokens may be added/removed or changed, any other factor may be intervened upon at any time for any reason.
          </p>
        </div>
      </div>
    </main>
  );
}
