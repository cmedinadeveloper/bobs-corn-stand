-- Create corn_purchase_attempts table for comprehensive logging
CREATE TABLE IF NOT EXISTS corn_purchase_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_type VARCHAR(20) NOT NULL CHECK (attempt_type IN ('success', 'rate_limited', 'validation_error', 'db_error', 'auth_error', 'internal_error')),
  quantity INTEGER,
  requested_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  error_code VARCHAR(50), -- 'RATE_LIMITED', 'INVALID_QUANTITY', 'UNAUTHORIZED', 'PURCHASE_FAILED', 'INTERNAL_ERROR'
  error_message TEXT,
  rate_limit_reset_at TIMESTAMP WITH TIME ZONE,
  purchase_id UUID REFERENCES corn_purchase(id) ON DELETE SET NULL, -- Link to successful purchase
  ip_address INET,
  user_agent TEXT,
  request_body JSONB, -- Store the original request for debugging
  response_status INTEGER, -- HTTP status code
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS corn_purchase_attempts_user_id_idx ON corn_purchase_attempts(user_id);
CREATE INDEX IF NOT EXISTS corn_purchase_attempts_created_at_idx ON corn_purchase_attempts(created_at);
CREATE INDEX IF NOT EXISTS corn_purchase_attempts_attempt_type_idx ON corn_purchase_attempts(attempt_type);
CREATE INDEX IF NOT EXISTS corn_purchase_attempts_user_created_idx ON corn_purchase_attempts(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE corn_purchase_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for attempts table
CREATE POLICY "Users can view their own purchase attempts" ON corn_purchase_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert purchase attempts" ON corn_purchase_attempts
  FOR INSERT WITH CHECK (true); -- Allow system to log all attempts

CREATE POLICY "System can update purchase attempts" ON corn_purchase_attempts
  FOR UPDATE WITH CHECK (true); -- Allow system to update attempts with results

-- Create a function to extract IP from request headers (if needed)
CREATE OR REPLACE FUNCTION extract_client_ip(headers JSONB)
RETURNS INET AS $$
BEGIN
  -- Try to extract IP from common headers
  IF headers ? 'x-forwarded-for' THEN
    RETURN CAST(split_part(headers->>'x-forwarded-for', ',', 1) AS INET);
  ELSIF headers ? 'x-real-ip' THEN
    RETURN CAST(headers->>'x-real-ip' AS INET);
  ELSIF headers ? 'cf-connecting-ip' THEN
    RETURN CAST(headers->>'cf-connecting-ip' AS INET);
  END IF;
  
  RETURN NULL;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;