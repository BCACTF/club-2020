FROM node:14
COPY html /usr/src/
WORKDIR /usr/src/
RUN npm install serve
EXPOSE 5000
CMD [ "./node_modules/.bin/serve" ]