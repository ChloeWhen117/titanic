FROM node:10
MAINTAINER Chloe Nguyen

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY . .

RUN chmod +x ./wait-for.sh
#CMD sh -c './wait-for.sh -t 0 mysql-db:3306 -- sequelize db:migrate && nodemon index.js'
CMD sh -c './wait-for.sh -t 0 mysql-db:3306 -- sequelize db:migrate && npm run dev'

EXPOSE 5000



