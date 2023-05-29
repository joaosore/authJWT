FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json .yarnrc.yml ./

RUN apk update && apk add python3 make g++ 

RUN corepack enable
RUN corepack prepare yarn@stable --activate
RUN yarn set version latest

COPY . .

RUN npm cache clean --force
RUN rm -rf node_modules
RUN yarn install
RUN yarn build

RUN mkdir -p uploads
RUN mkdir -p download
RUN mkdir -p download/templates
RUN mkdir -p download/users
RUN mkdir -p download/files

EXPOSE 80

CMD ["yarn", "production"]