import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, HeartIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { CORN_PRICE } from "@/constants/corn";

interface PurchaseSectionProps {
  timeRemaining: number;
  canPurchase: boolean;
  isLoading: boolean;
  onPurchaseCorn: () => void;
}

export default function PurchaseSection({
  timeRemaining,
  canPurchase,
  isLoading,
  onPurchaseCorn,
}: PurchaseSectionProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
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
                      ${CORN_PRICE.toFixed(2)}
                    </div>
                    <div className="text-sm text-corn-yellow-600">per ear</div>
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
                onClick={onPurchaseCorn}
                disabled={!canPurchase || isLoading}
                className="w-full bg-corn-yellow-600 hover:bg-corn-yellow-700 text-white disabled:bg-corn-yellow-300"
              >
                {isLoading
                  ? "Processing..."
                  : !canPurchase
                  ? `Wait ${formatTime(timeRemaining)}`
                  : `Buy 1 Corn for $${CORN_PRICE.toFixed(2)}`}
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
  );
}
