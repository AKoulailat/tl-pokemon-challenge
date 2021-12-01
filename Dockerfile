FROM node:11.15.0

WORKDIR /Users/akoulailat/Desktop/Node/tl-pokemon-api/src

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "src/index.js"]
