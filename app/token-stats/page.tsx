'use client';

import { useEffect, useState } from 'react';

interface VolumeBreakdown {
  buys: string;
  sells: string;
  total: string;
  buyCount: number;
  sellCount: number;
}

interface TokenStats {
  tokenInfo: {
    name: string;
    symbol: string;
    decimals: string;
    totalSupply: string;
    totalSupplyRaw: string;
  };
  holders: {
    count: number;
    topHolders: Array<{
      address: string;
      balance: string;
      balanceRaw: string;
    }>;
  };
  volume: {
    total: string;
    totalRaw: string;
    transferCount: number;
    breakdown: {
      '24h': VolumeBreakdown;
      '72h': VolumeBreakdown;
      '7d': VolumeBreakdown;
      allTime: VolumeBreakdown;
    };
  };
}

export default function TokenStatsPage() {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/token-stats');
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch token stats');
        }

        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300 text-lg">Loading token stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const tokenAddress = '0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1';
  const tradingAddress = '0x6538A83a81d855B965983161AF6a83e616D16fD5';

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {stats.tokenInfo.name} Stats
          </h1>
          <p className="text-purple-300 text-lg">{stats.tokenInfo.symbol}</p>
          <a
            href={`https://scan.pulsechain.box/token/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
          >
            {tokenAddress}
          </a>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Supply */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-2 uppercase tracking-wide">
              Total Supply
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats.tokenInfo.totalSupply}
            </p>
            <p className="text-purple-400 text-sm mt-1">{stats.tokenInfo.symbol}</p>
          </div>

          {/* Holders */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-2 uppercase tracking-wide">
              Total Holders
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats.holders.count.toLocaleString()}
            </p>
            <p className="text-purple-400 text-sm mt-1">Unique addresses</p>
          </div>

          {/* Total Transfers */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-2 uppercase tracking-wide">
              Total Transfers
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats.volume.transferCount.toLocaleString()}
            </p>
            <p className="text-purple-400 text-sm mt-1">All time</p>
          </div>
        </div>

        {/* Volume Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 24h Volume */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-4 uppercase tracking-wide">
              24 Hour Volume
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-400">Buys</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['24h'].buys}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Sells</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['24h'].sells}</span>
              </div>
              <div className="border-t border-purple-500/30 pt-3 flex justify-between">
                <span className="text-purple-300">Total</span>
                <span className="text-white font-bold">{stats.volume.breakdown['24h'].total}</span>
              </div>
              <div className="text-xs text-purple-400">
                {stats.volume.breakdown['24h'].buyCount} buys / {stats.volume.breakdown['24h'].sellCount} sells
              </div>
            </div>
          </div>

          {/* 72h Volume */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-4 uppercase tracking-wide">
              72 Hour Volume
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-400">Buys</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['72h'].buys}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Sells</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['72h'].sells}</span>
              </div>
              <div className="border-t border-purple-500/30 pt-3 flex justify-between">
                <span className="text-purple-300">Total</span>
                <span className="text-white font-bold">{stats.volume.breakdown['72h'].total}</span>
              </div>
              <div className="text-xs text-purple-400">
                {stats.volume.breakdown['72h'].buyCount} buys / {stats.volume.breakdown['72h'].sellCount} sells
              </div>
            </div>
          </div>

          {/* 7d Volume */}
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-purple-300 text-sm font-semibold mb-4 uppercase tracking-wide">
              7 Day Volume
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-400">Buys</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['7d'].buys}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Sells</span>
                <span className="text-white font-semibold">{stats.volume.breakdown['7d'].sells}</span>
              </div>
              <div className="border-t border-purple-500/30 pt-3 flex justify-between">
                <span className="text-purple-300">Total</span>
                <span className="text-white font-bold">{stats.volume.breakdown['7d'].total}</span>
              </div>
              <div className="text-xs text-purple-400">
                {stats.volume.breakdown['7d'].buyCount} buys / {stats.volume.breakdown['7d'].sellCount} sells
              </div>
            </div>
          </div>
        </div>

        {/* Top Holders */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-white">Top 10 Holders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="text-left py-3 px-4 text-purple-300 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-purple-300 font-semibold">Address</th>
                  <th className="text-right py-3 px-4 text-purple-300 font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {stats.holders.topHolders.map((holder, index) => (
                  <tr
                    key={holder.address}
                    className="border-b border-purple-500/10 hover:bg-purple-500/10 transition-colors"
                  >
                    <td className="py-3 px-4 text-purple-200">#{index + 1}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://scan.pulsechain.box/address/${holder.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-mono text-sm"
                      >
                        {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                      </a>
                      {holder.address.toLowerCase() === tradingAddress.toLowerCase() && (
                        <span className="ml-2 text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">
                          Trading Contract
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-white font-semibold">
                      {holder.balance} {stats.tokenInfo.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-purple-400 text-sm">
          <p>
            Volume calculated from transfers to/from pump.tires contract
          </p>
          <a
            href={`https://scan.pulsechain.box/address/${tradingAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 font-mono"
          >
            {tradingAddress}
          </a>
        </div>
      </div>
    </div>
  );
}
