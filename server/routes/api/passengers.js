
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Passenger = require('../../models').Passenger;
const { connection } = require('../../index')

// @route   GET passengers/test
// @desc    Tests passengers route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Passengers Works"})
);

// @route   GET passengers/all
// @desc    Tests passengers route
// @access  Public
router.get('/all', (req, res) => {
  Passenger.findOne({ })
    .then((project) => {
      res.send(project);
    });
});


module.exports = router;