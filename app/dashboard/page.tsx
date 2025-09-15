"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard, OrderData } from "@/components/ui/order-card";
import { ClockIcon, HeartIcon, CheckCircledIcon } from "@radix-ui/react-icons";

// Mock data for demonstration
const mockOrders: OrderData[] = [
  {
    transactionId: "TXN-001",
    cornAmount: 1,
    timestamp: "2024-09-14T10:30:00Z",
    price: 2.99,
    status: "completed",
  },
  {
    transactionId: "TXN-002",
    cornAmount: 1,
    timestamp: "2024-09-13T14:15:00Z",
    price: 2.99,
    status: "completed",
  },
  {
    transactionId: "TXN-003",
    cornAmount: 1,
    timestamp: "2024-09-12T09:45:00Z",
    price: 2.99,
    status: "completed",
  },
];

export default function DashboardPage() {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canPurchase, setCanPurchase] = useState(true);
  const [orders] = useState<OrderData[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(false);

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful purchase
    setCanPurchase(false);
    setTimeRemaining(60); // 1 minute cooldown
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const userStats = {
    totalCornPurchased: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.cornAmount, 0),
    totalSpent: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.price, 0),
    lastPurchase: orders[0]?.timestamp,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-corn-yellow-900 mb-2">
          Welcome to your Corn Dashboard! 🌽
        </h1>
        <p className="text-corn-yellow-700">
          Your one-stop shop for premium corn with Bob&apos;s famous
          rate-limited ordering system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-corn-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corn-yellow-700">
              Total Corn Purchased
            </CardTitle>
            <span className="text-2xl">🌽</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corn-yellow-900">
              {userStats.totalCornPurchased}
            </div>
            <p className="text-xs text-corn-yellow-600">Fresh ears delivered</p>
          </CardContent>
        </Card>

        <Card className="border-corn-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corn-yellow-700">
              Total Spent
            </CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corn-yellow-900">
              ${userStats.totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-corn-yellow-600">
              Supporting local farming
            </p>
          </CardContent>
        </Card>

        <Card className="border-corn-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corn-yellow-700">
              Member Since
            </CardTitle>
            <span className="text-2xl">⭐</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corn-yellow-900">
              Sept 2024
            </div>
            <p className="text-xs text-corn-yellow-600">
              Trusted corn enthusiast
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Section */}
      <Card className="mb-8 border-corn-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-corn-yellow-900">
            <span className="text-2xl">🛒</span>
            Purchase Fresh Corn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Rate Limiting Display */}
            <div className="bg-corn-yellow-50 border border-corn-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <ClockIcon className="h-5 w-5 text-corn-yellow-700" />
                <h3 className="font-semibold text-corn-yellow-900">
                  Bob&apos;s Fair Share Policy
                </h3>
              </div>
              <p className="text-corn-yellow-700 mb-3">
                To ensure everyone gets fresh corn, we limit purchases to{" "}
                <strong>1 corn per customer per minute</strong>.
              </p>
              {!canPurchase && (
                <div className="flex items-center gap-2 text-corn-orange-700">
                  <ClockIcon className="h-4 w-4" />
                  <span className="font-mono font-semibold">
                    Next purchase available in: {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>

            {/* Purchase Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-corn-yellow-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🌽</span>
                      <div>
                        <h4 className="font-semibold text-corn-yellow-900">
                          Premium Sweet Corn
                        </h4>
                        <p className="text-sm text-corn-yellow-600">
                          Freshly picked this morning
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-corn-yellow-900">
                        $2.99
                      </div>
                      <div className="text-sm text-corn-yellow-600">
                        per ear
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-corn-green-700">
                    <CheckCircledIcon className="h-4 w-4" />
                    <span>Non-GMO</span>
                    <CheckCircledIcon className="h-4 w-4" />
                    <span>Locally grown</span>
                    <CheckCircledIcon className="h-4 w-4" />
                    <span>Farm fresh</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchaseCorn}
                  disabled={!canPurchase || isLoading}
                  className="w-full bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white disabled:bg-corn-yellow-300"
                >
                  {isLoading
                    ? "Processing..."
                    : !canPurchase
                    ? `Wait ${formatTime(timeRemaining)}`
                    : "Buy 1 Corn for $2.99"}
                </Button>
              </div>

              <div className="bg-corn-green-50 border border-corn-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HeartIcon className="h-5 w-5 text-corn-green-700" />
                  <h4 className="font-semibold text-corn-green-900">
                    Why Choose Bob&apos;s Corn?
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-corn-green-700">
                  <li>• Harvested at peak sweetness</li>
                  <li>• Sustainable farming practices</li>
                  <li>• Support local agriculture</li>
                  <li>• API-powered freshness guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="border-corn-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-corn-yellow-900">
            <span className="text-2xl">📦</span>
            Your Corn Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <OrderCard key={order.transactionId} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🌽</span>
              <h3 className="text-lg font-semibold text-corn-yellow-900 mb-2">
                No corn orders yet!
              </h3>
              <p className="text-corn-yellow-600">
                Start your corn journey by making your first purchase above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
