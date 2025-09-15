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
