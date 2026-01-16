FROM node:20-alpine AS base
WORKDIR /app

# habilita pnpm (corepack)
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copiamos solo lo mínimo primero (para cache)
COPY package.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma ./prisma
COPY src ./src
COPY application ./application
COPY domain ./domain
COPY infrastructure ./infrastructure

# Instala deps
RUN pnpm install --prod=false

# Build
RUN pnpm run build

# Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma

EXPOSE 3001
CMD ["node", "dist/src/main.js"]
