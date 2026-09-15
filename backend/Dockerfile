FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-fund --no-audit

COPY src ./src

ENV PORT=3001
EXPOSE 3001

CMD ["node", "src/server.js"]
