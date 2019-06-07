const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const bodyParser = require('body-parser');

const app = express();
const passengers = require('./routes/api/passengers');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use('/api/passengers', passengers);

app.listen(5000, () => console.log("The node.js app is listening on port 5000."));

//Connect to MySQL DB
const connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    //Check if database was seeded already, and do it if needed
    connection.query("SELECT * FROM `Passengers` AS `Passenger` LIMIT 1", { type: Sequelize.QueryTypes.SELECT})
      .then(passenger => {
        if (!passenger) {
          console.log("Database is not seeded, will run seeds now...");
          const { exec } = require("child_process");
          try {
            exec("node_modules/.bin/sequelize db:seed:all", (err, stdout, stderr) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(stdout);
            });
          } catch (error) {
            console.log("Error while seeding database: ", error);
          }
        } else {
          console.log("Database already seeded.");
        }
      });
    })
  .catch(err => {
    console.log("Unable to connect to the database:", err);
  });

