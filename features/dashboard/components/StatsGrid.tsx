import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStats {
  totalCornPurchased: number;
  totalSpent: number;
  lastPurchase: string | null;
  totalAttempts: number;
  successRate: number;
}

interface StatsGridProps {
  userStats: UserStats;
  loadingSuccessful: boolean;
}

export default function StatsGrid({
  userStats,
  loadingSuccessful,
}: StatsGridProps) {
  return (
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
            {loadingSuccessful ? "..." : userStats.totalCornPurchased}
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
            {loadingSuccessful ? "..." : `$${userStats.totalSpent.toFixed(2)}`}
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
  );
}
