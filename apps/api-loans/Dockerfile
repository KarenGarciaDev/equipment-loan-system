FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build
RUN corepack enable
EXPOSE 3003
CMD ["node", "dist/main.js"]
