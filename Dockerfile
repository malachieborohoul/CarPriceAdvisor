FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


COPY package*.json /usr/src/app/

RUN npm install --legacy-peer-deps

COPY . /usr/src/app/


EXPOSE 3001


CMD ["node", "index.js"]