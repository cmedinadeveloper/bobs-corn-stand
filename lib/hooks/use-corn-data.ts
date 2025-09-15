import useSWR from "swr";
import {
  CornHistoryResponse,
  BuyCornResponse,
  CornPurchaseAttemptResponse,
} from "@/lib/types/corn-purchase";
import { CORN_PRICE } from "@/constants/corn";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Hook to fetch corn purchase history (successful purchases only)
export function useCornHistory(
  type?:
    | "success"
    | "rate_limited"
    | "validation_error"
    | "db_error"
    | "auth_error"
    | "internal_error"
) {
  const url = type ? `/api/corn-history?type=${type}` : "/api/corn-history";

  const { data, error, isLoading, mutate } = useSWR<CornHistoryResponse>(
    url,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  return {
    data: data?.success ? data : null,
    error: error || (data && !data.success ? data : null),
    isLoading,
    mutate,
  };
}

// Hook to fetch successful purchases only (for stats and order history)
export function useSuccessfulPurchases() {
  return useCornHistory("success");
}

// Hook to fetch all purchase attempts (for the attempts sheet)
export function useAllAttempts(limit = 50) {
  const { data, error, isLoading, mutate } = useSWR<CornHistoryResponse>(
    `/api/corn-history?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds for more recent data
      revalidateOnFocus: true,
    }
  );

  return {
    data: data?.success ? data : null,
    error: error || (data && !data.success ? data : null),
    isLoading,
    mutate,
  };
}

// Purchase corn function with error handling
export async function purchaseCorn(
  quantity = 1,
  price = CORN_PRICE
): Promise<BuyCornResponse> {
  const response = await fetch("/api/buy-corn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity, price }),
  });

  const data: BuyCornResponse = await response.json();
  return data;
}

// Calculate user statistics from successful purchases
export function calculateUserStats(attempts: CornPurchaseAttemptResponse[]) {
  const successfulPurchases = attempts.filter(
    (attempt: CornPurchaseAttemptResponse) => attempt.attempt_type === "success"
  );

  const totalCornPurchased = successfulPurchases.reduce(
    (sum: number, attempt: CornPurchaseAttemptResponse) =>
      sum + (attempt.quantity || 0),
    0
  );

  const totalSpent = successfulPurchases.reduce(
    (sum: number, attempt: CornPurchaseAttemptResponse) =>
      sum + (attempt.total_price || 0),
    0
  );

  const lastPurchase = successfulPurchases[0]?.created_at;

  return {
    totalCornPurchased,
    totalSpent,
    lastPurchase,
    totalAttempts: attempts.length,
    successRate:
      attempts.length > 0
        ? (successfulPurchases.length / attempts.length) * 100
        : 0,
  };
}
