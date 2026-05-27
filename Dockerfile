FROM mirror.gcr.io/library/node:22.14.0-bookworm-slim AS builder

WORKDIR /home/app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM mirror.gcr.io/library/node:22.14.0-bookworm-slim AS runner

ENV NODE_ENV=production
WORKDIR /home/app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/public ./public
COPY --from=builder /home/app/src/core/db/Tables.sql ./dist/core/db/Tables.sql

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "require('http').get('http://localhost:'+process.env.NODE_DOCKER_PORT+'/',(res)=>process.exit(res.statusCode===200?0:1)).on('error',()=>process.exit(1));"

USER node
CMD ["npm", "run", "start"]
