FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY 1.hbs ./
COPY 2.hbs ./
COPY 3.hbs ./
COPY 4.hbs ./
COPY queries.json ./
COPY banned.json ./
COPY index.js ./

EXPOSE 1337

CMD [ "yarn", "start" ]