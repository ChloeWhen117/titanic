
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

// @route   GET passengers/test
// @desc    Tests passengers route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Passengers Works"})
);

// @route   GET passengers/all
// @desc    Tests passengers route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Passengers Works"})
);

module.exports = router;