import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { RATE_LIMIT_WINDOW_SECONDS } from "@/constants/corn";

export const cornPurchaseRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.tokenBucket(1, `${RATE_LIMIT_WINDOW_SECONDS} s`, 1), // 1 token, refills every 60 seconds, max 1 token
  analytics: true,
  prefix: "@upstash/ratelimit/corn",
  ephemeralCache: new Map(), // Add in-memory cache for immediate consistency
});

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
};
