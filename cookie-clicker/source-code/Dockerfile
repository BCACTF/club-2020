FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY templates ./templates
COPY index.js ./
COPY static ./static
COPY config.json ./

EXPOSE 1337

CMD [ "npm", "start" ]
