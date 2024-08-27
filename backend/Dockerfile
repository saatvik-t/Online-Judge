FROM node:20-alpine

RUN apk add --no-cache openjdk11

RUN apk add --no-cache python3 && ln -sf python3 /usr/bin/python

RUN apk update && apk add --no-cache g++

WORKDIR /usr/src/backend

COPY package*.json .

RUN npm install
COPY . .

RUN node -v
RUN npm -v

EXPOSE 5000

CMD ["node", "index.js"]