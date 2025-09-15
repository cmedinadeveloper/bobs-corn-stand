import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
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
          message: "You must be logged in to view your purchase history",
        },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100); // Max 100 records
    const offset = parseInt(searchParams.get("offset") || "0");
    const type = searchParams.get("type"); // Filter by attempt type

    // Build query
    let query = supabase
      .from("corn_purchase_attempts")
      .select(
        `
        id,
        attempt_type,
        quantity,
        requested_price,
        total_price,
        error_code,
        error_message,
        rate_limit_reset_at,
        purchase_id,
        response_status,
        created_at
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Add type filter if specified
    if (
      type &&
      [
        "success",
        "rate_limited",
        "validation_error",
        "db_error",
        "auth_error",
        "internal_error",
      ].includes(type)
    ) {
      query = query.eq("attempt_type", type);
    }

    const { data: attempts, error: fetchError } = await query;

    if (fetchError) {
      console.error("Failed to fetch purchase attempts:", fetchError);
      return NextResponse.json(
        {
          success: false,
          error: "FETCH_FAILED",
          message: "Failed to fetch purchase history",
        },
        { status: 500 }
      );
    }

    // Get summary statistics
    const { data: stats, error: statsError } = await supabase
      .from("corn_purchase_attempts")
      .select("attempt_type")
      .eq("user_id", user.id);

    let summary = {
      total_attempts: 0,
      successful_purchases: 0,
      rate_limited_attempts: 0,
      failed_attempts: 0,
    };

    if (!statsError && stats) {
      summary = {
        total_attempts: stats.length,
        successful_purchases: stats.filter((s) => s.attempt_type === "success")
          .length,
        rate_limited_attempts: stats.filter(
          (s) => s.attempt_type === "rate_limited"
        ).length,
        failed_attempts: stats.filter((s) => s.attempt_type !== "success")
          .length,
      };
    }

    return NextResponse.json(
      {
        success: true,
        attempts: attempts || [],
        summary,
        pagination: {
          limit,
          offset,
          has_more: attempts ? attempts.length === limit : false,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in corn-history API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "An unexpected error occurred while fetching purchase history",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "METHOD_NOT_ALLOWED",
      message: "Only GET method is allowed for this endpoint",
    },
    { status: 405 }
  );
}

export async function PUT() {
  return POST();
}

export async function DELETE() {
  return POST();
}

export async function PATCH() {
  return POST();
}
