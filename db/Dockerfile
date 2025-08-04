FROM node:22

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
COPY .env .env

RUN pnpm install --frozen-lockfile



COPY . .




CMD ["node", "dist/index.js"]
