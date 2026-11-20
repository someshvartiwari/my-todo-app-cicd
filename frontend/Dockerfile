# syntax=docker/dockerfile:1.7

# Stage 1: Build React application
FROM node:20-alpine AS build

WORKDIR /app

# Temporarily mount Zscaler certificate
RUN --mount=type=secret,id=zscaler \
    sh -c 'cat /run/secrets/zscaler >> /etc/ssl/certs/ca-certificates.crt'

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

ARG VITE_API_URL=/api/todos
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]