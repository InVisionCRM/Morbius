import crypto from 'crypto';

const FALLBACK = 'anonymous';

export function hashIP(rawIp: unknown): string {
  let normalized = '';

  if (typeof rawIp === 'string' && rawIp.trim().length > 0) {
    normalized = rawIp.trim();
  } else if (rawIp != null) {
    try {
      normalized = JSON.stringify(rawIp);
    } catch {
      normalized = FALLBACK;
    }
  } else {
    normalized = FALLBACK;
  }

  return crypto.createHash('md5').update(normalized).digest('hex');
}

export function getClientIP(request: Request): string {
  const candidates = [
    request.headers.get('x-forwarded-for')?.split(',')[0].trim(),
    request.headers.get('x-real-ip'),
    request.headers.get('cf-connecting-ip'),
    request.headers.get('fly-client-ip'),
    request.headers.get('true-client-ip'),
  ].filter(Boolean) as string[];

  if (candidates.length > 0) {
    return candidates[0];
  }

  // Next.js exposes the client IP on the request in dev environments.
  const devIp = (request as unknown as { ip?: string }).ip;
  if (devIp && devIp.length > 0) {
    return devIp;
  }

  return 'unknown';
}
