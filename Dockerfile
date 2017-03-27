FROM node:latest

WORKDIR /app
COPY index.js .
COPY package.json .
RUN npm i

EXPOSE 3000
CMD ["node", "index.js"]