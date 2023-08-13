FROM node:18-alpine as builder
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
RUN chown -R node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force
ENV NODE_ENV production
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
USER node
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
ENV NODE_ENV production
CMD ["node", "dist/main.js"]
