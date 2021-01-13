FROM node:14
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY index.js ./
COPY camera.MOV ./

EXPOSE 1337

CMD [ "npm", "start" ]