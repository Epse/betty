FROM node:22-alpine
RUN apk --no-cache add curl python3 build-base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --include dev
COPY . .
RUN ["npx", "tsup", "src/server.ts", "--minify"]

FROM node:22-alpine
RUN apk --no-cache add curl python3 build-base
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/package*.json .
RUN npm ci --omit dev

FROM node:22-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/* .
CMD ["node", "server.js"]
