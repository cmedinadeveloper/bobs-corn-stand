import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CornPurchaseAttemptResponse } from "@/lib/types/corn-purchase";
import {
  ClockIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

interface AttemptCardProps {
  attempt: CornPurchaseAttemptResponse;
}

export function AttemptCard({ attempt }: AttemptCardProps) {
  const getAttemptIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircledIcon className="h-4 w-4 text-green-600" />;
      case "rate_limited":
        return <ClockIcon className="h-4 w-4 text-orange-600" />;
      case "validation_error":
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />;
      case "auth_error":
        return <CrossCircledIcon className="h-4 w-4 text-red-600" />;
      case "db_error":
      case "internal_error":
        return <CrossCircledIcon className="h-4 w-4 text-red-600" />;
      default:
        return <InfoCircledIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAttemptBadge = (type: string) => {
    switch (type) {
      case "success":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Success
          </Badge>
        );
      case "rate_limited":
        return (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-800 hover:bg-orange-100"
          >
            Rate Limited
          </Badge>
        );
      case "validation_error":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Invalid Request
          </Badge>
        );
      case "auth_error":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Auth Error
          </Badge>
        );
      case "db_error":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Database Error
          </Badge>
        );
      case "internal_error":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            System Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getAttemptIcon(attempt.attempt_type)}
            <span className="font-medium text-sm">
              {attempt.quantity || 1} corn{" "}
              {attempt.attempt_type === "success" ? "purchased" : "attempted"}
            </span>
          </div>
          {getAttemptBadge(attempt.attempt_type)}
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-mono">
              {formatPrice(attempt.total_price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span className="font-mono text-xs">
              {formatTime(attempt.created_at)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-mono text-xs">{attempt.response_status}</span>
          </div>
        </div>

        {attempt.error_message && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
            {attempt.error_message}
          </div>
        )}

        {attempt.rate_limit_reset_at && (
          <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
            Rate limit resets: {formatTime(attempt.rate_limit_reset_at)}
          </div>
        )}

        {attempt.purchase_id && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700 font-mono">
            Purchase ID: {attempt.purchase_id.slice(0, 8)}...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
