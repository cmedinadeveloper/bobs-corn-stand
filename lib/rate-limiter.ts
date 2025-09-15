import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { RATE_LIMIT_WINDOW_SECONDS } from "@/constants/corn";

export const cornPurchaseRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, `${RATE_LIMIT_WINDOW_SECONDS} s`), // 1 request per 60 seconds
  analytics: true,
  prefix: "@upstash/ratelimit/corn",
});

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
};
