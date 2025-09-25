# Frontend Dockerfile (Vite + React)
# Multi-stage build: build static assets, then serve with a lightweight web server

# 1) Build stage
FROM node:20-bullseye AS build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV NPM_CONFIG_PRODUCTION=false
WORKDIR /app

# Install deps (better cache)
COPY client/my-portfolio/package.json client/my-portfolio/package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

# Copy source and build
COPY client/my-portfolio .
# Print the API base to help debugging build-time injection (optional)
RUN echo "Building with VITE_API_BASE_URL=${VITE_API_BASE_URL}"
RUN npm run build

# 2) Run stage - use an ultra-small web server (nginx-alpine)
FROM nginx:1.27-alpine
ENV NODE_ENV=production

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Provide a default nginx config for SPA routing
COPY client/my-portfolio/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


