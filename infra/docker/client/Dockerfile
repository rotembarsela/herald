FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/client/package.json apps/client/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install

COPY . .

WORKDIR /app/apps/client

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
