FROM node:22-alpine AS deps
RUN apk add --update --no-cache git openssh libc6-compat --virtual builds-deps build-base py-pip
WORKDIR /src/app
COPY . ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /src/app
COPY . .
COPY --from=deps /src/app/node_modules ./node_modules

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /src/app

COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/public ./public
COPY --from=builder /src/app/next.config.ts next.config.ts
COPY --from=builder /src/app/tsconfig.json tsconfig.json
COPY --from=builder /src/app/package.json package.json
COPY --from=builder /src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn","start"]