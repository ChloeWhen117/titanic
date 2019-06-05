FROM node:10
MAINTAINER Chloe Nguyen

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]

EXPOSE 3000