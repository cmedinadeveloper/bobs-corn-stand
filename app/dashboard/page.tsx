"use client";

import { useState, useEffect } from "react";
import { OrderData } from "@/components/cards/order-card";
import {
  useSuccessfulPurchases,
  useAllAttempts,
  purchaseCorn,
  calculateUserStats,
} from "@/lib/hooks/use-corn-data";
import { toast } from "sonner";
import { CORN_PRICE } from "@/constants/corn";

import WelcomeSection from "@/features/dashboard/components/WelcomeSection";
import StatsGrid from "@/features/dashboard/components/StatsGrid";
import PurchaseSection from "@/features/dashboard/components/PurchaseSection";
import OrderHistory from "@/features/dashboard/components/OrderHistory";

export default function DashboardPage() {
  // SWR data fetching
  const {
    data: successfulData,
    isLoading: loadingSuccessful,
    mutate: mutateSuccessful,
    error: successfulError,
  } = useSuccessfulPurchases();
  const {
    data: allAttemptsData,
    isLoading: loadingAttempts,
    mutate: mutateAttempts,
  } = useAllAttempts();

  // Local state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canPurchase, setCanPurchase] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Calculate stats from real data - handle empty data gracefully
  const userStats =
    successfulData && successfulData.attempts
      ? calculateUserStats(successfulData.attempts)
      : {
          totalCornPurchased: 0,
          totalSpent: 0,
          lastPurchase: null,
          totalAttempts: 0,
          successRate: 0,
        };

  // Convert successful attempts to OrderData format for existing UI - handle empty data gracefully
  const orders: OrderData[] =
    successfulData && successfulData.attempts
      ? successfulData.attempts.map((attempt) => ({
          transactionId: attempt.purchase_id || attempt.id,
          cornAmount: attempt.quantity || 1,
          timestamp: attempt.created_at,
          price: attempt.total_price || 0,
          status: "completed" as const,
        }))
      : [];

  // Simulate rate limiting countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanPurchase(true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handlePurchaseCorn = async () => {
    setIsLoading(true);

    try {
      const result = await purchaseCorn(1, CORN_PRICE);

      if (result.success) {
        toast.success(result.message);
        // Refresh data
        mutateSuccessful();
        mutateAttempts();
        // Reset purchase state
        setCanPurchase(true);
        setTimeRemaining(0);
      } else if (result.error === "RATE_LIMITED") {
        toast.error(result.message);
        setCanPurchase(false);
        setTimeRemaining(result.retryAfter);

        // Set automatic re-enable based on actual API response
        setTimeout(() => {
          setCanPurchase(true);
          setTimeRemaining(0);
          toast.success("You can now purchase corn again! 🌽");
        }, result.retryAfter * 1000);
      } else {
        toast.error(result.message);
        // Don't change purchase state for other errors
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to purchase corn. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <WelcomeSection />

      <StatsGrid userStats={userStats} loadingSuccessful={loadingSuccessful} />

      <PurchaseSection
        timeRemaining={timeRemaining}
        canPurchase={canPurchase}
        isLoading={isLoading}
        onPurchaseCorn={handlePurchaseCorn}
      />

      <OrderHistory
        orders={orders}
        loadingSuccessful={loadingSuccessful}
        successfulError={successfulError}
        sheetOpen={sheetOpen}
        onSheetOpenChange={setSheetOpen}
        allAttemptsData={allAttemptsData}
        loadingAttempts={loadingAttempts}
      />
    </main>
  );
}
