FROM node:20-alpine AS base
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# 1) Instalar dependencias del workspace
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-auth/package.json apps/api-auth/package.json
RUN pnpm install --frozen-lockfile

# 2) Build api-auth + prisma generate
FROM deps AS build
COPY apps/api-auth apps/api-auth
WORKDIR /repo/apps/api-auth
RUN pnpm dlx prisma@6.19.2 generate --schema prisma/schema.prisma
RUN pnpm run build

# 3) Crear un "bundle" PROD solo para api-auth (esto es CLAVE)
FROM deps AS prod
WORKDIR /repo
RUN pnpm --filter api-auth... deploy --prod /prod

# 4) Imagen final
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# deps prod reales del servicio
COPY --from=prod /prod/node_modules ./node_modules
COPY --from=prod /prod/package.json ./package.json

# build + prisma
COPY --from=build /repo/apps/api-auth/dist ./dist
COPY --from=build /repo/apps/api-auth/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-lc", "npx prisma generate --schema prisma/schema.prisma && node dist/main.js"]
