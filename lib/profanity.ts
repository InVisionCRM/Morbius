const BLOCKED_PATTERNS = [
  'fuck',
  'shit',
  'bitch',
  'cunt',
  'asshole',
  'dick',
  'piss',
  'bastard',
  'slut',
  'whore',
].map((word) => new RegExp(`\\b${word}\\b`, 'i'));

export function containsProfanity(text: string): boolean {
  if (!text) {
    return false;
  }

  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text));
}
