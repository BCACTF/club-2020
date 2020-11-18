FROM node:14
WORKDIR /usr/src/app
COPY index.html /usr/src/app
COPY IMG_0356.jpeg /usr/src/app
COPY IMG_0417.jpeg /usr/src/app
COPY IMG_0597.jpeg /usr/src/app
COPY IMG_0611.jpeg /usr/src/app
COPY IMG_0617.jpeg /usr/src/app
RUN npm install serve
EXPOSE 5000
CMD [ "./node_modules/.bin/serve" ]