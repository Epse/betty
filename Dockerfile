FROM node:22-alpine as compile
RUN apk --no-cache add curl python3 build-base
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --include dev
COPY . .
RUN ["npx", "tsup", "src/server.ts", "src/deploy-commands.ts"]

FROM node:22-alpine as modules
RUN apk --no-cache add curl python3 build-base
WORKDIR /usr/src/app
COPY --from=compile /usr/src/app/package*.json .
RUN npm ci --omit dev

FROM node:22-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY --from=modules /usr/src/app/node_modules ./node_modules
COPY --from=compile /usr/src/app/dist/*.js .
CMD ["node", "server.js"]
