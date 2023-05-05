FROM node:20-slim

COPY ./src/package.json /app/
COPY src /app/

WORKDIR /app 

RUN npm install
CMD ["node", "index.js"]