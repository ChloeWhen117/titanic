
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Passenger = require('../../models').Passenger;
const dbConfig = require("../../config/config.json").development;
//const { connection } = require('../../index');

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


// @route   GET api/passengers/test
// @desc    Tests passengers route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Passengers Works"})
);

// @route   GET api/passengers/test-query
// @desc    Gets X passengers route
// @access  Public
router.get('/test-query', (req, res) => {
  connection.query("SELECT * FROM `Passengers` AS `Passengers` LIMIT 10", { type: Sequelize.QueryTypes.SELECT})
    .then(passengers => {
      res.send(passengers);
    });
});

// @route   GET api/passengers/all
// @desc    Gets all passengers route
// @access  Public
router.get('/all', (req, res) => {
  connection.query("SELECT * FROM `Passengers` AS `Passengers`", { type: Sequelize.QueryTypes.SELECT})
    .then(passengers => {
      res.send(passengers);
    });
});


module.exports = router;
