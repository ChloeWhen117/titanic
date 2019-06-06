'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Passengers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PassengerId: {
        type: Sequelize.INTEGER
      },
      Survived: {
        type: Sequelize.INTEGER
      },
      PClass: {
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Sex: {
        type: Sequelize.STRING
      },
      Age: {
        type: Sequelize.INTEGER
      },
      SibSp: {
        type: Sequelize.STRING
      },
      Parch: {
        type: Sequelize.INTEGER
      },
      Ticket: {
        type: Sequelize.STRING
      },
      Fare: {
        type: Sequelize.FLOAT
      },
      Cabin: {
        type: Sequelize.STRING
      },
      Embarked: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Passengers');
  }
};