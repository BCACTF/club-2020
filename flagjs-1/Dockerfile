FROM node:14
WORKDIR /usr/src/html
COPY html /usr/src
RUN npm install serve
EXPOSE 5000
CMD [ "./node_modules/.bin/serve" ]