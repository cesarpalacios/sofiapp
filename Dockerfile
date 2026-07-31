# Dockerfile para desarrollo de SofiApp
# Node 22 con soporte PWA y Vite

FROM node:22-alpine

# Instalar dependencias del sistema necesarias para Vite/PWA
RUN apk add --no-cache git curl bash

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero (para cache de Docker)
COPY package*.json ./

# Instalar dependencias
RUN npm ci || npm install

# Copiar el resto del código (se sobreescribe con volume mount en dev)
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando por defecto: dev server con host accesible desde fuera del container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
