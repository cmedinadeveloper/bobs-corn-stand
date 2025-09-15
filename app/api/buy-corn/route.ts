import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cornPurchaseRateLimit } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
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

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const quantity = body.quantity || 1;
    const price = body.price || 5.0;

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
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
      return NextResponse.json(
        {
          success: false,
          error: "PURCHASE_FAILED",
          message: "Failed to process corn purchase. Please try again.",
        },
        { status: 500 }
      );
    }

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
