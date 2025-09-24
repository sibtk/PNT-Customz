type Bucket = { tokens: number; lastRefill: number };

const buckets = new Map<string, Bucket>();

export function rateLimit({ key, max = 5, windowMs = 60_000 }: { key: string; max?: number; windowMs?: number }) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: max, lastRefill: now };
  // refill tokens
  const elapsed = now - bucket.lastRefill;
  if (elapsed > windowMs) {
    bucket.tokens = max;
    bucket.lastRefill = now;
  }
  if (bucket.tokens <= 0) {
    buckets.set(key, bucket);
    return { ok: false } as const;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return { ok: true } as const;
}


