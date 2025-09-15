import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OrderData {
  transactionId: string;
  cornAmount: number;
  timestamp: string;
  price: number;
  status: "completed" | "pending" | "failed";
}

interface OrderCardProps {
  order: OrderData;
  className?: string;
}

export function OrderCard({ order, className }: OrderCardProps) {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-corn-green-100 text-corn-green-800 border-corn-green-200";
      case "pending":
        return "bg-corn-yellow-100 text-corn-yellow-800 border-corn-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌽</span>
            <div>
              <h3 className="font-semibold text-corn-yellow-900">
                {order.cornAmount} Corn{order.cornAmount !== 1 ? "s" : ""}
              </h3>
              <p className="text-sm text-corn-yellow-600">
                ${order.price.toFixed(2)}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-corn-yellow-600">Transaction ID:</span>
            <code className="text-corn-yellow-800 bg-corn-yellow-50 px-2 py-1 rounded text-xs">
              {order.transactionId}
            </code>
          </div>
          <div className="flex justify-between">
            <span className="text-corn-yellow-600">Date:</span>
            <span className="text-corn-yellow-800">
              {formatDate(order.timestamp)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
