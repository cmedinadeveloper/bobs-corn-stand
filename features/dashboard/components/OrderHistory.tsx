import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard, OrderData } from "@/components/cards/order-card";
import PurchaseAttemptsSheet from "./PurchaseAttemptsSheet";
import { CornPurchaseAttemptResponse } from "@/lib/types/corn-purchase";

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
  successfulError: Error | null;
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
            <div className="text-corn-yellow-600">
              Loading your corn orders...
            </div>
          </div>
        ) : successfulError ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">⚠️</span>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Failed to load orders
            </h3>
            <p className="text-red-500">
              Please refresh the page or try again later.
            </p>
          </div>
        ) : orders.length > 0 ? (
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
  );
}
