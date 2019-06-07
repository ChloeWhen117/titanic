'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define('Passenger', {
    PassengerId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    Survived: DataTypes.INTEGER,
    PClass: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Sex: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    SibSp: DataTypes.STRING,
    Parch: DataTypes.INTEGER,
    Ticket: DataTypes.STRING,
    Fare: DataTypes.FLOAT,
    Cabin: DataTypes.STRING,
    Embarked: DataTypes.STRING
  }, {});
  Passenger.associate = function(models) {
    // associations can be defined here
  };
  return Passenger;
};