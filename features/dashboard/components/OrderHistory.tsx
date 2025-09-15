import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard, OrderData } from "@/components/cards/order-card";
import PurchaseAttemptsSheet from "./PurchaseAttemptsSheet";
import { CornPurchaseAttemptResponse } from "@/lib/types/corn-purchase";

interface FetchError extends Error {
  status?: number;
  code?: string;
}

interface AllAttemptsData {
  summary: {
    total_attempts: number;
    successful_purchases: number;
  };
  attempts: CornPurchaseAttemptResponse[];
}

interface OrderHistoryProps {
  orders: OrderData[];
  loadingSuccessful: boolean;
  successfulError: FetchError | null;
  sheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  allAttemptsData: AllAttemptsData | null;
  loadingAttempts: boolean;
}

export default function OrderHistory({
  orders,
  loadingSuccessful,
  successfulError,
  sheetOpen,
  onSheetOpenChange,
  allAttemptsData,
  loadingAttempts,
}: OrderHistoryProps) {
  return (
    <Card className="border-corn-yellow-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-corn-yellow-900">
            <span className="text-2xl">📦</span>
            Your Corn Order History
          </CardTitle>
          <PurchaseAttemptsSheet
            sheetOpen={sheetOpen}
            onSheetOpenChange={onSheetOpenChange}
            allAttemptsData={allAttemptsData}
            loadingAttempts={loadingAttempts}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loadingSuccessful ? (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="text-2xl mb-2">🌽</div>
              <div className="text-corn-yellow-600">
                Loading your corn orders...
              </div>
            </div>
          </div>
        ) : successfulError ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">⚠️</span>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              {successfulError?.status === 401
                ? "Authentication Error"
                : "Failed to load orders"}
            </h3>
            <p className="text-red-500 mb-4">
              {successfulError?.status === 401
                ? "Please sign in again to view your purchase history."
                : "There was an error loading your purchase history."}
            </p>
            <button
              onClick={() => {
                if (successfulError?.status === 401) {
                  window.location.href = "/auth/login";
                } else {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              {successfulError?.status === 401 ? "Sign In" : "Try Again"}
            </button>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.transactionId} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <span className="text-6xl mb-4 block animate-bounce">🌽</span>
            </div>
            <h3 className="text-xl font-semibold text-corn-yellow-900 mb-3">
              Welcome to Bob&apos;s Corn Stand!
            </h3>
            <p className="text-corn-yellow-600 mb-6 max-w-md mx-auto">
              You haven&apos;t made any corn purchases yet. Start your corn
              journey by making your first purchase above - fresh corn awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-corn-yellow-500">
              <div className="flex items-center gap-1">
                <span>🚀</span>
                <span>Premium quality corn</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>Fair rate limiting</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                <span>🌱</span>
                <span>Farm fresh daily</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
