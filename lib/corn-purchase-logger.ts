import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export type AttemptType =
  | "success"
  | "rate_limited"
  | "validation_error"
  | "db_error"
  | "auth_error"
  | "internal_error";

export interface LogAttemptParams {
  userId?: string;
  attemptType: AttemptType;
  quantity?: number;
  requestedPrice?: number;
  totalPrice?: number;
  errorCode?: string;
  errorMessage?: string;
  rateLimitResetAt?: Date;
  purchaseId?: string;
  request: NextRequest;
  responseStatus: number;
  requestBody?: Record<string, unknown>;
}

export class CornPurchaseLogger {
  constructor() {
    // We'll initialize this in each method since createClient is async
  }

  private extractClientIP(request: NextRequest): string | null {
    // Try to get real IP from various headers
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }

    const realIP = request.headers.get("x-real-ip");
    if (realIP) {
      return realIP;
    }

    const cfIP = request.headers.get("cf-connecting-ip");
    if (cfIP) {
      return cfIP;
    }

    // Fallback - this might be localhost in development
    return request.headers.get("x-forwarded-for") || "127.0.0.1";
  }

  async logAttempt(params: LogAttemptParams): Promise<string | null> {
    try {
      const supabase = await createClient();

      const {
        userId,
        attemptType,
        quantity,
        requestedPrice,
        totalPrice,
        errorCode,
        errorMessage,
        rateLimitResetAt,
        purchaseId,
        request,
        responseStatus,
        requestBody,
      } = params;

      const attemptData = {
        user_id: userId || null,
        attempt_type: attemptType,
        quantity: quantity || null,
        requested_price: requestedPrice || null,
        total_price: totalPrice || null,
        error_code: errorCode || null,
        error_message: errorMessage || null,
        rate_limit_reset_at: rateLimitResetAt?.toISOString() || null,
        purchase_id: purchaseId || null,
        ip_address: this.extractClientIP(request),
        user_agent: request.headers.get("user-agent") || null,
        request_body: requestBody ? JSON.stringify(requestBody) : null,
        response_status: responseStatus,
      };

      const { data, error } = await supabase
        .from("corn_purchase_attempts")
        .insert([attemptData])
        .select("id")
        .single();

      if (error) {
        console.error("Failed to log purchase attempt:", error);
        return null;
      }

      return data?.id || null;
    } catch (error) {
      console.error("Unexpected error logging purchase attempt:", error);
      return null;
    }
  }

  async updateAttempt(
    attemptId: string,
    updates: Partial<LogAttemptParams>
  ): Promise<boolean> {
    try {
      const supabase = await createClient();

      const updateData: Record<string, unknown> = {};

      if (updates.attemptType) updateData.attempt_type = updates.attemptType;
      if (updates.errorCode) updateData.error_code = updates.errorCode;
      if (updates.errorMessage) updateData.error_message = updates.errorMessage;
      if (updates.purchaseId) updateData.purchase_id = updates.purchaseId;
      if (updates.responseStatus)
        updateData.response_status = updates.responseStatus;
      if (updates.totalPrice) updateData.total_price = updates.totalPrice;

      const { error } = await supabase
        .from("corn_purchase_attempts")
        .update(updateData)
        .eq("id", attemptId);

      if (error) {
        console.error("Failed to update purchase attempt:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Unexpected error updating purchase attempt:", error);
      return false;
    }
  }
}

// Export a singleton instance
export const cornLogger = new CornPurchaseLogger();
