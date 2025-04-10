FROM docker.io/node:lts-alpine AS dev
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm i
