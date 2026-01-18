FROM node:20-alpine AS base
WORKDIR /repo
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-auth/package.json apps/api-auth/package.json
RUN pnpm install --frozen-lockfile
FROM deps AS build
COPY apps/api-auth apps/api-auth
WORKDIR /repo/apps/api-auth
RUN pnpm prisma generate --schema prisma/schema.prisma
RUN pnpm run build
FROM deps AS proddeps
WORKDIR /repo
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=proddeps /prod/node_modules ./node_modules
COPY --from=proddeps /prod/package.json ./package.json
COPY --from=build /repo/apps/api-auth/dist ./dist
COPY --from=build /repo/apps/api-auth/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
