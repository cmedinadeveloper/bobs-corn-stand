import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const cornPurchaseRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "1 m"), // 1 request per minute
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
