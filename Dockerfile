FROM node:22-alpine
RUN apk --no-cache add curl
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD [ "node", "src/server.ts" ]
