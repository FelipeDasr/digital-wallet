FROM node:22.14.0-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

# Production
FROM node:22.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production && yarn cache clean

COPY wait-for-it.sh entrypoint.sh ./
RUN chmod +x entrypoint.sh wait-for-it.sh

COPY --from=builder /usr/src/app/dist ./dist

ENTRYPOINT ["./entrypoint.sh"]
