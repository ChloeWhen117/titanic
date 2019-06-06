FROM node:10
MAINTAINER Chloe Nguyen

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

RUN chmod +x ./wait-for.sh
CMD sh -c './wait-for.sh -t 0 mysql-db:3306 -- npm run dev'

EXPOSE 5000



