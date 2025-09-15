// API Response Types for Corn Purchase

export interface CornPurchase {
  id: string;
  user_id: string;
  quantity: number;
  price: number;
  status: "completed" | "pending" | "failed";
  created_at: string;
  updated_at: string;
}

export interface CornPurchaseResponse {
  id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface BuyCornSuccessResponse {
  success: true;
  purchase: CornPurchaseResponse;
  message: string;
}

export interface BuyCornRateLimitResponse {
  success: false;
  error: "RATE_LIMITED";
  message: string;
  retryAfter: number;
  nextPurchaseAt: string;
}

export interface BuyCornErrorResponse {
  success: false;
  error:
    | "UNAUTHORIZED"
    | "INVALID_QUANTITY"
    | "PURCHASE_FAILED"
    | "INTERNAL_ERROR"
    | "METHOD_NOT_ALLOWED";
  message: string;
}

export type BuyCornResponse =
  | BuyCornSuccessResponse
  | BuyCornRateLimitResponse
  | BuyCornErrorResponse;

export interface BuyCornRequest {
  quantity?: number;
  price?: number;
}

// Purchase Attempt Logging Types

export type AttemptType =
  | "success"
  | "rate_limited"
  | "validation_error"
  | "db_error"
  | "auth_error"
  | "internal_error";

export interface CornPurchaseAttempt {
  id: string;
  user_id: string | null;
  attempt_type: AttemptType;
  quantity: number | null;
  requested_price: number | null;
  total_price: number | null;
  error_code: string | null;
  error_message: string | null;
  rate_limit_reset_at: string | null;
  purchase_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  request_body: string | null;
  response_status: number;
  created_at: string;
}

export interface CornPurchaseAttemptResponse {
  id: string;
  attempt_type: AttemptType;
  quantity: number | null;
  requested_price: number | null;
  total_price: number | null;
  error_code: string | null;
  error_message: string | null;
  rate_limit_reset_at: string | null;
  purchase_id: string | null;
  response_status: number;
  created_at: string;
}

export interface CornHistorySuccessResponse {
  success: true;
  attempts: CornPurchaseAttemptResponse[];
  summary: {
    total_attempts: number;
    successful_purchases: number;
    rate_limited_attempts: number;
    failed_attempts: number;
  };
  pagination: {
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface CornHistoryErrorResponse {
  success: false;
  error:
    | "UNAUTHORIZED"
    | "FETCH_FAILED"
    | "INTERNAL_ERROR"
    | "METHOD_NOT_ALLOWED";
  message: string;
}

export type CornHistoryResponse =
  | CornHistorySuccessResponse
  | CornHistoryErrorResponse;
