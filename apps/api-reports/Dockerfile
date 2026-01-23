FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

# 👇 instala deps del proyecto + agrega microservices/kafkajs aunque tu npm local falle
RUN npm install && npm install @nestjs/microservices kafkajs

COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm install --omit=dev @nestjs/microservices kafkajs

COPY --from=builder /app/dist ./dist

EXPOSE 3007
CMD ["node", "dist/main.js"]
