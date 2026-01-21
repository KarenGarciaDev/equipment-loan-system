FROM node:18-alpine

WORKDIR /app
RUN corepack enable

# Archivos base del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# package.json del servicio
COPY apps/api-reservations/package.json apps/api-reservations/package.json

# Instalar deps (incluye devDeps)
RUN pnpm install --frozen-lockfile --filter api-reservations... --prod=false

# Código
COPY apps/api-reservations/src apps/api-reservations/src
COPY apps/api-reservations/prisma apps/api-reservations/prisma
COPY apps/api-reservations/tsconfig*.json apps/api-reservations/
COPY apps/api-reservations/nest-cli.json apps/api-reservations/

# Prisma
RUN pnpm -C apps/api-reservations exec prisma generate --schema prisma/schema.prisma

# Build (YA SIN npx)
RUN pnpm --filter api-reservations build

EXPOSE 3004
CMD ["node", "apps/api-reservations/dist/main.js"]
