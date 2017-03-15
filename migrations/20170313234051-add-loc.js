'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    //add columns for facebookId and facebookToken
    return queryInterface.addColumn('users', 'location', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'location');
  }
};
