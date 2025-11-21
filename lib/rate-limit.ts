// In-memory cache for recent posts (last 60 seconds)
const recentPosts = new Map<string, number[]>();

// Configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const RATE_LIMIT_MAX_POSTS = 5; // 5 posts per window

// Clean up old entries from memory cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [ipHash, timestamps] of recentPosts.entries()) {
    const filtered = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    if (filtered.length === 0) {
      recentPosts.delete(ipHash);
    } else {
      recentPosts.set(ipHash, filtered);
    }
  }
}, 10000); // Clean up every 10 seconds

export async function checkRateLimit(ipHash: string): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const memoryTimestamps = recentPosts.get(ipHash) || [];
  const recentMemoryPosts = memoryTimestamps.filter(ts => ts >= windowStart);

  if (recentMemoryPosts.length >= RATE_LIMIT_MAX_POSTS) {
    return false; // Rate limit exceeded
  }

  return true; // Within rate limit
}

export async function recordPost(ipHash: string): Promise<void> {
  const now = Date.now();
  const timestamps = recentPosts.get(ipHash) || [];
  timestamps.push(now);
  recentPosts.set(ipHash, timestamps);
}
