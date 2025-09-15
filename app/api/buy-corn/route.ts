import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cornPurchaseRateLimit } from "@/lib/rate-limiter";
import { cornLogger } from "@/lib/corn-purchase-logger";

export async function POST(request: NextRequest) {
  let attemptId: string | null = null;
  let requestBody: Record<string, unknown> = {};

  try {
    // Parse request body early for logging
    try {
      requestBody = await request.json();
    } catch {
      requestBody = {};
    }

    const quantity = (requestBody.quantity as number) || 1;
    const price = (requestBody.price as number) || 5.0;

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      // Log auth error attempt
      attemptId = await cornLogger.logAttempt({
        attemptType: "auth_error",
        quantity,
        requestedPrice: price,
        errorCode: "UNAUTHORIZED",
        errorMessage: "You must be logged in to purchase corn",
        request,
        responseStatus: 401,
        requestBody,
      });

      return NextResponse.json(
        {
          success: false,
          error: "UNAUTHORIZED",
          message: "You must be logged in to purchase corn",
        },
        { status: 401 }
      );
    }

    // Check rate limit
    const { success: rateLimitSuccess, reset } =
      await cornPurchaseRateLimit.limit(user.id);

    if (!rateLimitSuccess) {
      const now = Date.now();
      const retryAfterSeconds = Math.ceil((reset - now) / 1000);
      const nextPurchaseAt = new Date(reset).toISOString();

      // Log rate limit attempt
      attemptId = await cornLogger.logAttempt({
        userId: user.id,
        attemptType: "rate_limited",
        quantity,
        requestedPrice: price,
        totalPrice: price * quantity,
        errorCode: "RATE_LIMITED",
        errorMessage: "You can only buy corn once per minute",
        rateLimitResetAt: new Date(reset),
        request,
        responseStatus: 429,
        requestBody,
      });

      return NextResponse.json(
        {
          success: false,
          error: "RATE_LIMITED",
          message: "You can only buy corn once per minute",
          retryAfter: retryAfterSeconds,
          nextPurchaseAt,
        },
        { status: 429 }
      );
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      // Log validation error attempt
      attemptId = await cornLogger.logAttempt({
        userId: user.id,
        attemptType: "validation_error",
        quantity,
        requestedPrice: price,
        errorCode: "INVALID_QUANTITY",
        errorMessage: "Quantity must be a number between 1 and 10",
        request,
        responseStatus: 400,
        requestBody,
      });

      return NextResponse.json(
        {
          success: false,
          error: "INVALID_QUANTITY",
          message: "Quantity must be a number between 1 and 10",
        },
        { status: 400 }
      );
    }

    // Create corn purchase record
    const { data: purchase, error: insertError } = await supabase
      .from("corn_purchase")
      .insert([
        {
          user_id: user.id,
          quantity,
          price: price * quantity,
          status: "completed",
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);

      // Log database error attempt
      attemptId = await cornLogger.logAttempt({
        userId: user.id,
        attemptType: "db_error",
        quantity,
        requestedPrice: price,
        totalPrice: price * quantity,
        errorCode: "PURCHASE_FAILED",
        errorMessage: "Failed to process corn purchase. Please try again.",
        request,
        responseStatus: 500,
        requestBody,
      });

      return NextResponse.json(
        {
          success: false,
          error: "PURCHASE_FAILED",
          message: "Failed to process corn purchase. Please try again.",
        },
        { status: 500 }
      );
    }

    // Log successful attempt
    attemptId = await cornLogger.logAttempt({
      userId: user.id,
      attemptType: "success",
      quantity,
      requestedPrice: price,
      totalPrice: price * quantity,
      purchaseId: purchase.id,
      request,
      responseStatus: 200,
      requestBody,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        purchase: {
          id: purchase.id,
          quantity: purchase.quantity,
          price: purchase.price,
          created_at: purchase.created_at,
        },
        message: `Successfully purchased ${quantity} corn! 🌽`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in buy-corn API:", error);

    // Log internal error attempt
    if (!attemptId) {
      await cornLogger.logAttempt({
        attemptType: "internal_error",
        quantity: (requestBody.quantity as number) || 1,
        requestedPrice: (requestBody.price as number) || 5.0,
        errorCode: "INTERNAL_ERROR",
        errorMessage: "An unexpected error occurred. Please try again.",
        request,
        responseStatus: 500,
        requestBody,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Only POST method is allowed for this endpoint",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return GET();
}

export async function DELETE() {
  return GET();
}

export async function PATCH() {
  return GET();
}
