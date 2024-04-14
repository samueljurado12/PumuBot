FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm ci && \
    npm run build && \
    npm prune --omit=dev

CMD ["node", "dist/index.js"]
