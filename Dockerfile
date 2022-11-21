FROM node:16.7

RUN apt-get update && apt-get install -y nodejs && apt-get install -y npm
WORKDIR /user/app
COPY ./ /user/app
EXPOSE 3000
RUN npm install
RUN npm run build
CMD node server.js
