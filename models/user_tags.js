'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_tags = sequelize.define('user_tags', {
    tagId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_tags;
};