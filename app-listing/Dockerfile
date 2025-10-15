# Production-like image serving built app via Vite preview
FROM node:20-alpine

WORKDIR /app

# System deps required for some native binaries (esbuild)
RUN apk add --no-cache libc6-compat bash

# Enable Corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install deps with layer caching
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Expose preview port used by this app
EXPOSE 5003

ENV NODE_ENV=production

# Run preview on 0.0.0.0 so it is reachable from host
CMD ["sh", "-c", "pnpm vite preview --host 0.0.0.0 --port 5003"]
