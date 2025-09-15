import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AttemptCard } from "@/components/cards/attempt-card";
import { GearIcon } from "@radix-ui/react-icons";
import { CornPurchaseAttemptResponse } from "@/lib/types/corn-purchase";

interface AllAttemptsData {
  summary: {
    total_attempts: number;
    successful_purchases: number;
  };
  attempts: CornPurchaseAttemptResponse[];
}

interface PurchaseAttemptsSheetProps {
  sheetOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
  allAttemptsData: AllAttemptsData | null;
  loadingAttempts: boolean;
}

export default function PurchaseAttemptsSheet({
  sheetOpen,
  onSheetOpenChange,
  allAttemptsData,
  loadingAttempts,
}: PurchaseAttemptsSheetProps) {
  return (
    <Sheet open={sheetOpen} onOpenChange={onSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <GearIcon className="h-4 w-4" />
          View All Attempts
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Purchase Attempts History</SheetTitle>
          <SheetDescription>
            View all your corn purchase attempts including successful purchases,
            rate limits, and errors.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 p-4">
          {/* Summary Stats */}
          {allAttemptsData && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-corn-yellow-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-corn-yellow-900">
                  {allAttemptsData.summary.total_attempts}
                </div>
                <div className="text-sm text-corn-yellow-600">
                  Total Attempts
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-corn-green-700">
                  {allAttemptsData.summary.successful_purchases}
                </div>
                <div className="text-sm text-corn-yellow-600">Successful</div>
              </div>
            </div>
          )}

          {/* Attempts List */}
          <div className="space-y-3 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto p-2">
            {loadingAttempts ? (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <div className="text-2xl mb-2">🌽</div>
                  <div className="text-corn-yellow-600">
                    Loading attempts...
                  </div>
                </div>
              </div>
            ) : allAttemptsData && allAttemptsData.attempts.length > 0 ? (
              allAttemptsData.attempts.map((attempt) => (
                <AttemptCard key={attempt.id} attempt={attempt} />
              ))
            ) : (
              <div className="text-center py-12">
                <span className="text-5xl mb-4 block animate-bounce">🌽</span>
                <h3 className="text-lg font-semibold text-corn-yellow-900 mb-2">
                  No purchase attempts yet
                </h3>
                <p className="text-corn-yellow-600 text-sm max-w-sm mx-auto">
                  Your purchase history will appear here once you start making
                  corn purchases. Each attempt - successful or not - will be
                  tracked!
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
