# base image
FROM node:22

WORKDIR /app

ENV PORT=3000

COPY . .

RUN npm i

CMD [ "node", "--watch", "server.js" ]