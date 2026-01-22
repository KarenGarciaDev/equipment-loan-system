FROM node:18-alpine

WORKDIR /app
RUN corepack enable

# Copiar solo package.json
COPY package.json ./

# Instalar dependencias
RUN pnpm install --prod=false

# Copiar todo el código
COPY . .

EXPOSE 3005

CMD ["pnpm", "start"]
