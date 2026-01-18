FROM node:18-alpine
WORKDIR /app

# 1) Dependencias
COPY package*.json ./
RUN npm install

# 2) Prisma schema (para poder generar el client)
COPY prisma ./prisma

# 3) Generar Prisma Client dentro de la imagen
RUN npx prisma generate

# 4) Copiar el resto y compilar
COPY . .
RUN npm run build

EXPOSE 3002
CMD ["node", "dist/main.js"]
