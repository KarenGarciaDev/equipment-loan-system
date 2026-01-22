FROM node:18-alpine

WORKDIR /app
RUN corepack enable

COPY package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

CMD ["node", "dist/main.js"]
