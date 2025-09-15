-- Create corn_purchase table
CREATE TABLE IF NOT EXISTS corn_purchase (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL DEFAULT 5.00,
  status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_corn_purchase_updated_at 
    BEFORE UPDATE ON corn_purchase 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS corn_purchase_user_id_idx ON corn_purchase(user_id);
CREATE INDEX IF NOT EXISTS corn_purchase_created_at_idx ON corn_purchase(created_at);

-- Enable Row Level Security
ALTER TABLE corn_purchase ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own corn purchases" ON corn_purchase
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own corn purchases" ON corn_purchase
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own corn purchases" ON corn_purchase
  FOR UPDATE USING (auth.uid() = user_id);