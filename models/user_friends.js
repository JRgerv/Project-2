'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_friends = sequelize.define('user_friends', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_friends;
};