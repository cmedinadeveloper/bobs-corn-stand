# Corn Purchase API Implementation

## Overview
This implementation provides a rate-limited API endpoint for purchasing corn with Supabase integration and Redis-based rate limiting.

## Setup Instructions

### 1. Database Setup
Run the SQL script in Supabase to create the corn_purchase table:
```sql
-- Execute the contents of database/create_corn_purchase_table.sql in your Supabase SQL editor
```

### 2. Environment Variables
Ensure you have the following environment variables set:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 3. Dependencies
The following packages should be installed:
```bash
npm install @upstash/ratelimit @upstash/redis
```

## API Endpoint

### POST /api/buy-corn

**Authentication**: Required (Supabase auth)

**Rate Limit**: 1 purchase per minute per user

**Request Body** (optional):
```json
{
  "quantity": 2,
  "price": 5.00
}
```

**Success Response** (200):
```json
{
  "success": true,
  "purchase": {
    "id": "uuid",
    "quantity": 2,
    "price": 10.00,
    "created_at": "2025-09-14T15:30:00Z"
  },
  "message": "Successfully purchased 2 corn! 🌽"
}
```

**Rate Limited Response** (429):
```json
{
  "success": false,
  "error": "RATE_LIMITED",
  "message": "You can only buy corn once per minute",
  "retryAfter": 45,
  "nextPurchaseAt": "2025-09-14T15:31:00Z"
}
```

**Error Responses**:
- `401 UNAUTHORIZED`: User not authenticated
- `400 INVALID_QUANTITY`: Quantity not between 1-10
- `500 PURCHASE_FAILED`: Database error
- `405 METHOD_NOT_ALLOWED`: Non-POST request

## Frontend Usage Example

```typescript
async function buyCorn(quantity = 1) {
  try {
    const response = await fetch('/api/buy-corn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity })
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success(data.message);
    } else if (data.error === 'RATE_LIMITED') {
      toast.error(`${data.message}. Try again in ${data.retryAfter} seconds.`);
      // Set up countdown timer using data.nextPurchaseAt
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Failed to purchase corn. Please try again.');
  }
}
```

## Database Schema

```sql
Table: corn_purchase
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- quantity: INTEGER (Default: 1)
- price: DECIMAL(10,2) (Default: 5.00)
- status: VARCHAR(20) (Default: 'completed')
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

## Security Features

1. **Row Level Security**: Users can only access their own purchases
2. **Rate Limiting**: 1 purchase per minute per user using Redis
3. **Input Validation**: Quantity limits (1-10) and type checking
4. **Authentication**: Supabase auth required for all requests
5. **Error Handling**: Comprehensive error responses without exposing internals