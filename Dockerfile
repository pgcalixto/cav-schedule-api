FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache \
    make \
    python3 \
 \
 && npm install \
 \
 && apk del \
    make \
    python3

COPY . .

RUN npm run build

# TODO: multi-stage build + npm prune --production

CMD npm run initDb && npm start
