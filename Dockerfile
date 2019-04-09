# FROM alpine
# RUN apk add --update nodejs npm
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package.json /usr/src/app/
# ENV NODE_ENV production
# RUN npm install
# COPY . /usr/src/app/
# RUN npm run build
# EXPOSE 3000
# CMD [ "npm", "start" ]

FROM node:latest as builder

WORKDIR /src

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn swag

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:alpine

WORKDIR /src

COPY --from=builder /src  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
