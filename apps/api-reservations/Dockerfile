FROM node:18-alpine

WORKDIR /app
RUN corepack enable

# Archivos base del monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# package.json del servicio
COPY apps/api-reservations/package.json apps/api-reservations/package.json

# Instalar deps (incluye devDeps)
RUN pnpm install --filter api-reservations... --prod=false

# Código
COPY apps/api-reservations apps/api-reservations

# Prisma
RUN pnpm -C apps/api-reservations exec prisma generate --schema prisma/schema.prisma

# Build
RUN pnpm --filter api-reservations build

EXPOSE 3004

# 🔥 ESTA LÍNEA ES LA QUE ARREGLA TODO
CMD ["node", "apps/api-reservations/dist/main.js"]
