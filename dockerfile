# Use multi-stage build for optimal layer caching
FROM oven/bun:1.1-alpine AS base
WORKDIR /app

# Install system dependencies needed for build
RUN apk add --no-cache git python3 make g++

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json bun.lock ./

# Install all dependencies
RUN bun install

# Stage 2: Build application (for production)
FROM base AS builder
WORKDIR /app

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN bun run build

# Stage 3: Production image
FROM base AS production
WORKDIR /app

# Install production dependencies only
COPY package.json bun.lockb ./
RUN bun install --production

# Copy built application and production node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start production server
ENV NODE_ENV=production
CMD ["bun", "run", "start"]

# Stage 4: Development image
FROM base AS development
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git

# Copy package files first for better layer caching
COPY package.json bun.lock ./

# Install all dependencies
RUN bun install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server with hot reload
CMD ["bun", "run", "dev"]