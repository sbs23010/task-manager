FROM node:18-alpine

COPY *.js /app/
COPY *.json /app/

WORKDIR /app/

RUN npm install

CMD node index.js