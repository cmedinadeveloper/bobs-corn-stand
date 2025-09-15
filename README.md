# 🌽 Bob's Corn Stand

A premium corn ordering system built with Next.js, featuring rate-limited purchases, real-time tracking, and a delightful user experience.

## 🌟 Features

### 🛒 **Smart Corn Ordering**
- **Rate-Limited Purchases**: Fair ordering system (1 corn per customer per 60 seconds)
- **Real-Time Countdown**: Visual timer showing when next purchase is available
- **Instant Feedback**: Success/error notifications with contextual colors

### 📊 **Dashboard Analytics**
- **Personal Stats**: Track total corn purchased, money spent, and purchase history
- **Success Rate Tracking**: Monitor your purchase attempt success rate
- **Detailed History**: View all purchase attempts with status breakdown

### 🔐 **Authentication & Security**
- **Supabase Auth**: Secure user authentication system
- **Protected Routes**: Dashboard access requires authentication
- **Rate Limiting**: Upstash Redis-powered purchase throttling

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Custom Corn Theme**: Beautiful yellow/green color palette
- **Accessible Components**: Built with Radix UI primitives
- **Toast Notifications**: Color-coded feedback system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun package manager
- Supabase account
- Upstash Redis account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cmedinadeveloper/bobs-corn-stand.git
   cd bobs-corn-stand
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Upstash Redis Configuration
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   ```

4. **Database Setup**
   Run the SQL scripts in the `database/` folder to create the required tables:
   - `create_corn_purchase_table.sql`
   - `create_corn_purchase_attempts_table.sql`

5. **Run the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── buy-corn/            # Corn purchase endpoint
│   │   ├── corn-history/        # Purchase history endpoint
│   │   └── health/              # Health check endpoint
│   ├── auth/                    # Authentication pages
│   ├── dashboard/               # Main dashboard
│   └── layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   ├── cards/                   # Order and attempt cards
│   ├── forms/                   # Authentication forms
│   └── ui/                      # shadcn/ui components
├── constants/                    # Application constants
├── features/                     # Feature-based components
│   └── dashboard/               # Dashboard-specific components
├── hooks/                        # Custom React hooks
├── lib/                         # Utility libraries
│   ├── hooks/                   # Data fetching hooks
│   ├── supabase/               # Supabase client configuration
│   └── types/                   # TypeScript type definitions
└── public/                      # Static assets
```

## 🔌 API Documentation

### **POST** `/api/buy-corn`
Purchase corn with rate limiting protection.

**Request Body:**
```json
{
  "quantity": 1,
  "price": 5.0
}
```

**Response (Success):**
```json
{
  "success": true,
  "purchase": {
    "id": "uuid",
    "quantity": 1,
    "price": 5.0,
    "created_at": "2024-09-15T12:00:00Z"
  },
  "message": "Successfully purchased 1 corn! 🌽"
}
```

**Response (Rate Limited):**
```json
{
  "success": false,
  "error": "RATE_LIMITED",
  "message": "You can only buy corn once per minute",
  "retryAfter": 45,
  "nextPurchaseAt": "2024-09-15T12:01:00Z"
}
```

### **GET** `/api/corn-history`
Retrieve purchase history with optional filtering.

**Query Parameters:**
- `type` (optional): Filter by attempt type (`success`, `rate_limited`, etc.)
- `limit` (optional): Number of records to return (default: 20)

**Response:**
```json
{
  "success": true,
  "summary": {
    "total_attempts": 15,
    "successful_purchases": 12
  },
  "attempts": [...]
}
```

### **GET** `/api/health`
Health check endpoint for monitoring.

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## 🔧 Configuration

### Rate Limiting
Configure in `lib/rate-limiter.ts`:
```typescript
export const cornPurchaseRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"), // 1 request per 60 seconds
  analytics: true,
  prefix: "@upstash/ratelimit/corn",
});
```

### Corn Pricing
Update in `constants/corn.ts`:
```typescript
export const CORN_PRICE = 5.0;
export const RATE_LIMIT_WINDOW_SECONDS = 60;
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Docker
```bash
# Build the image
docker build -t bobs-corn-stand .

# Run the container
docker run -p 3000:3000 bobs-corn-stand
```

### Docker Compose
```bash
docker-compose up -d
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Rate Limiting**: Upstash Redis + @upstash/ratelimit
- **Data Fetching**: SWR
- **Notifications**: Sonner
- **Type Safety**: TypeScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/cmedinadeveloper/bobs-corn-stand/issues) page to report bugs or request features.

## 📞 Support

For support, email support@bobscornstand.com or join our Discord community.

---

Made with 🌽 by the Bob's Corn Stand team
