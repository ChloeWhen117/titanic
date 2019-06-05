FROM node:10
MAINTAINER Chloe Nguyen

# Create app directory
RUN mkdir -p /opt/app

RUN npm i npm@latest -g

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH


WORKDIR /opt/app
COPY . /opt/app

RUN chmod +x ./wait-for.sh
CMD sh -c './wait-for.sh -t 0 mysql-db:3306 -- npm start'

EXPOSE 5000



