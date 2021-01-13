FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY index.js ./
COPY static ./static

EXPOSE 1337

CMD [ "npm", "start" ]
