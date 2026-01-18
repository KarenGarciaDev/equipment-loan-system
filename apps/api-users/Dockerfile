FROM node:20-alpine

WORKDIR /app

# pnpm
RUN corepack enable

# deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start:prod"]
