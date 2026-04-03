# syntax=docker/dockerfile:1

# --- Dependências ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Build (Vite em modo produção: import.meta.env.PROD) ---
FROM deps AS builder
COPY . .

# URL relativa → Nginx faz proxy em nginx/default.conf (evita CORS no browser).
ARG VITE_PRODUCTS_API_URL=/api/products.json
ENV VITE_PRODUCTS_API_URL=$VITE_PRODUCTS_API_URL

# Opcional: URL pública (https://…) para canonical/OG no cliente e sitemap.xml no build.
ARG VITE_SITE_URL=
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

# --- Servir arquivos estáticos ---
FROM nginx:1.27-alpine AS runner
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
